var walk = function walk(node, callback) {
  callback(node);

  if (node.children && node.children.length > 0) {
    node.children.forEach(function (child) {
      walk(child, callback);
    });
  }
};

export default walk;