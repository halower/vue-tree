export const execFunc = (fn) => {
  let F = Function
  return new F('return ' + fn)()
}
