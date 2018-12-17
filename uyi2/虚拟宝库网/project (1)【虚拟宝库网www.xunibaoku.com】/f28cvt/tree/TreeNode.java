package interview.tree;

public class TreeNode {
  private final char value;
  private TreeNode left;
  private TreeNode right;
  private TreeNode parent;

  public TreeNode(char value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  public char getValue() {
    return value;
  }

  public TreeNode getLeft() {
    return left;
  }

  public void setLeft(TreeNode left) {
    this.left = left;
    if (this.left != null) {
      this.left.setParent(this);
    }
  }

  public TreeNode getRight() {
    return right;
  }

  public void setRight(TreeNode right) {
    this.right = right;
    if (this.right != null) {
      this.right.setParent(this);
    }
  }

  public TreeNode getParent() {
    return parent;
  }

  private void setParent(TreeNode parent) {
    this.parent = parent;
  }
}
