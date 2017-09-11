/**
 * from: https://github.com/qintao741/arrayTree/blob/master/lib/convertArrayToTree.js
 **/
export function convertArrayToTree(data, c) {
    if (!Array.isArray(data)) {
        throw new TypeError('array-unique expects an array.');
    }

    let config = {
        id: c.id ? c.id : "id",
        parentId: c.parentId ? c.parentId : "parentId",
        children: c.children ? c.children : "children",
    };

    var childrenListMap = {};
    var nodeIds = {};
    var tree = [], count = 0, total = 0;

    for (let d of data) {
        let parentId = d[config.parentId];
        if (childrenListMap[parentId] == null) {
            childrenListMap[parentId] = [];
        }
        nodeIds[d.id] = d;
        childrenListMap[parentId].push(d);
    }

    total = Object.keys(childrenListMap).length;

    for (let d of data) {
        let parentId = d[config.parentId];
        if (nodeIds[parentId] == null) {
            tree.push(d);
        }
    }

    for (let t of tree) {
        if (count == total) {
            break;
        }
        adaptToChildrenList(t);
    }

    function adaptToChildrenList(o) {
        if (childrenListMap[o[config.id]] !== null) {
            o[config.children] = childrenListMap[o[config.id]];
            count++;
            if (count == total) {
                return;
            }
        }
        if (o[config.children]) {
            for (let c of o[config.children]) {
                if (count == total) {
                    break;
                }
                adaptToChildrenList(c);
            }
        }
    }
    return tree;
};

export function convertTreeToArray(data, c) {

    if (!Array.isArray(data)) {
        throw new TypeError('array-unique expects an array.');
    }


    let config = {
        needDelete: c.needDelete ? c.needDelete : false,
        children: c.children ? c.children : "children"
    };

    let array = [];

    function convert(data) {
        let n = Object.assign({}, data);
        config.needDelete && delete n[config.children];
        array.push(n);

        if (data[config.children]) {
            for (let c of data[config.children]) {
                convert(c);
            }
        }
    }
    for (let d of data) {
        convert(d);
    }

    return array;
};
