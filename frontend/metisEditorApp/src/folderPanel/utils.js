export function makeNodePath(list, targetId) {
  function dfs(_list) {
    let path = [];
    for (let i = 0, len = _list.length; i < len; i++) {
      const item = _list[i];
      if (item.id === targetId) {
        path = [i];
        break;
      }
      if (item.children && item.children.length > 0) {
        const childPath = dfs(item.children);
        if (childPath.length) {
          path = [i, ...childPath];
          break;
        }
      }
    }
    return path;
  }
  return dfs(list);
}

export function makeCommandsPush(path, folder) {
  const result = {};
  let p = result;
  path.forEach((index) => {
    const obj = {};
    p[index] = {
      children: obj,
    };
    p = obj;
  }, {});

  p.$push = [folder];

  return result;
}

export function makeCommandsDelete(path) {
  const last = path.pop();
  if (path.length === 0) {
    return {
      $splice: [[last, 1]],
    };
  }

  const result = {};
  let p = result;
  path.forEach((index) => {
    const obj = {};
    p[index] = {
      children: obj,
    };
    p = obj;
  }, {});

  p.$splice = [[last, 1]];

  return result;
}

export function makeCommandsUpdate(path, folder) {
  const last = path.pop();
  if (path.length === 0) {
    return {
      [last]: {
        name: {
          $set: folder.name,
        },
        isPublic: {
          $set: folder.isPublic,
        },
      },
    };
  }

  const result = {};
  let p = result;
  path.forEach((index) => {
    const obj = {};
    p[index] = {
      children: obj,
    };
    p = obj;
  }, {});

  p[last] = {
    name: {
      $set: folder.name,
    },
    isPublic: {
      $set: folder.isPublic,
    },
  };

  return result;
}
