const pinyin = require('chinese-to-pinyin')
import Vue from 'vue'
export default class TreeStore {
    constructor(options) {
        for (let option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option]
            }
        }
        this.datas = new Map()
        const _traverseNodes = (root) => {
            for (let node of root) {
                this.datas.set(node.key, node)
                if (node.children && node.children.length > 0) _traverseNodes(node.children)
            }
        }
        _traverseNodes(this.root)
    }

    /**
     * https://github.com/alonesuperman update this method
     * fix 0-0-0-2000 bug  origin: parent: key.slice(0, -2)
     * @param key
     * @returns {{current: *, parent: (*|Array)}}
     * @private
     */
    __parseKey (key) {
        let parent = key.split("-");
        parent.pop();
        if(parent.length>1){
            parent = parent.join("-");
        }else{
            parent = null;
        }
        return {
            current: key,
            parent: parent
        }
    }
    /**
     * 控制 checkbox 选中状态
     * @param node
     */
    changeCheckStatus(node) {
        const _traverseUp = (node) => {
            if (node.key.length <= 3) {
                return false
            }

            let key = this.__parseKey(node.key)
            if (node.checked) {
                let parent = this.getNode(key.parent)
                Vue.set(parent, 'checked', this.sameSilibingChecked(key.parent, key.current))
                _traverseUp(parent)
            } else {
                if (!node.checked) {
                    let upparent = this.getNode(key.parent)
                    Vue.set(upparent, 'checked', false)
                    if (upparent.key) {
                        _traverseUp(upparent)
                    }
                }
            }
        }

        const _traverseDown = (node) => {
            if (node.children && node.children.length > 0) {
                for (let child of node.children) {
                    Vue.set(child, 'checked', node.checked)
                    _traverseDown(child)
                }
            }
        }
        _traverseUp(node)
        _traverseDown(node)
    }
    changeCheckHalfStatus(node) {
        let flag = false;
        //如果勾选的是子节点，父节点默认打上勾
        const _traverseUp = (node, flag) => {
            if (node.key.length <= 3) {
                return false
            }

            let key = this.__parseKey(node.key)

            let parent = null;
            if (node.checked) { //打钩
                if (key.parent) {
                    parent = this.getNode(key.parent)
                    if (flag) {
                        parent.checked = true
                        parent.nodeSelectNotAll = true
                        _traverseUp(parent, true)
                    } else {
                        parent.checked = true;
                        parent.nodeSelectNotAll = this.sameSilibingHalfChecked(true, parent, key.parent, key.current) === 'half' ? true : false; //返回true则全钩，false为半钩
                        _traverseUp(parent)
                    }
                }
            } else { //去钩
                if (key.parent) {
                    parent = this.getNode(key.parent)
                    if (this.sameSilibingHalfChecked(false, parent, key.parent, key.current) === "none") { //返回true则全没钩，false为半钩
                        parent.checked = false
                        parent.nodeSelectNotAll = false
                    } else {
                        parent.checked = true
                        parent.nodeSelectNotAll = true
                    }
                    _traverseUp(parent, true)
                }
            }
        }
        const _traverseDown = (node) => {
            if (node.children && node.children.length > 0) {
                if (node.nodeSelectNotAll) { //节点没勾选
                    node.nodeSelectNotAll = false
                }
                for (let child of node.children) {
                    Vue.set(child, 'checked', node.checked)
                    _traverseDown(child)
                }
            }
        }
        _traverseUp(node)
        _traverseDown(node)
    }

    /**
     * 同级的是否全部 check
     * @param parentKey
     * @param currentKey
     * @returns {boolean}
     */
    sameSilibingChecked(parentKey, currentKey) {
        let parent = this.datas.get(parentKey)
        let sbIds = []
        parent.children.forEach(x => {
            if (x.key !== currentKey) sbIds.push(x.key)
        })
        for (let key of sbIds) {
            let node = this.getNode(key)
            if (!node.checked) return false
        }
        return true
    }

    /**
     * 控制父框是否需要半钩状态
     * @param status
     * @param parent
     * @param parentId
     * @param currentId
     * @returns {*}
     */
    sameSilibingHalfChecked(status, parent, parentKey, currentKey) {
        let sbIds = []
        let currentNode = this.getNode(currentKey)
        parent.children.forEach(x => {
            if (!currentNode.nodeSelectNotAll && x.key !== currentKey) sbIds.push(x.key) //除去当前节点的剩下节点
        })

        if (status) { //打钩
            if (sbIds.length !== 0) {
                for (let id of sbIds) { //子节点只要有一个被选中则父框打黑，全选打钩，全没有被选无状态
                    let node = this.getNode(id)
                    if (!node.checked || node.nodeSelectNotAll) { //节点没勾选
                        return "half" //表示父框半钩的状态
                    }
                }
            } else {
                if (currentNode.nodeSelectNotAll) {
                    return "half"
                }
            }
            return "all" //表示全钩的状态
        } else { //去钩
            if (sbIds.length !== 0) {
                for (let id of sbIds) { //子节点只要有一个被选中则父框打黑，全选打钩，全没有被选无状态
                    let node = this.getNode(id)
                    if (node.checked || node.nodeSelectNotAll) { //有节点被勾选，父框半钩的状态
                        return "half"
                    }
                }
            } else {
                if (currentNode.nodeSelectNotAll) {
                    return "half" 
                }
            }
            return "none"
        }
    }
    isExitParent(parent) {
        let key = this.getNode(parent.key)
        if (key.current.length > 3) {
            return this.getNode(key.parent)
        }
        return null
    }
    isNullOrEmpty(world) {
        if (world) {
            return world.trim().length === 0
        }
        return true
    }
    filterNodes(keyworld, searchOptions) {
        const _filterNode = (val, node) => {
            if (!val) return true
            if (searchOptions.useEnglish) {
                return node.label.indexOf(val) !== -1
            } else {
                return this.toPinYin(node.label, searchOptions.useInitial).indexOf(this.toPinYin(keyworld.toLowerCase(), searchOptions.useInitial, true)) !== -1
            }
        }

        const _syncNodeStatus = (node) => {
            if (node.parentId) {
                let parentNode = this.getNode(node.parentId)
                if (node.visible) {
                    parentNode.visible = node.visible
                    _syncNodeStatus(parentNode)
                }
            }
        }
        let filterFunc = (searchOptions.customFilter && typeof(searchOptions.customFilter) === 'function') ? searchOptions.customFilter : _filterNode
        this.datas.forEach(node => {
            node.visible = filterFunc(keyworld, node)
            node.searched = false
            if (node.visible) {
                if (!this.isNullOrEmpty(keyworld)) {
                    node.searched = true
                }
                _syncNodeStatus(node)
            }
        })
    }
    getNode(key) {
        return this.datas.get(key)
    }
    toPinYin(keyworld, useInitial) {
        if (/^[a-zA-Z]/.test(keyworld)) {
            return keyworld
        }
        let fullpinyin = pinyin(keyworld, {
            filterChinese: true,
            noTone: true
        })
        if (useInitial) {
            let res = ''
            fullpinyin.split(' ').forEach(w => {
                if (!(/[a-zA-Z]/.test(w))) {
                    res += w
                } else {
                    res += w.slice(0, 1)
                }
            })
            return res
        }
        return fullpinyin
    }
    setData (node) {
        this.datas.set(node.key, node)
    }
}
