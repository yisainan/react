package interview.tree;

public class TreeTraversal {

  public void preOrder(TreeNode root) {
    if (root == null) {
      return;
    }
    System.out.print(root.getValue());
    preOrder(root.getLeft());
    preOrder(root.getRight());
  }

  public void inOrder(TreeNode root) {
    if (root == null) {
      return;
    }
    inOrder(root.getLeft());
    System.out.print(root.getValue());
    inOrder(root.getRight());
  }

  public void postOrder(TreeNode root) {
    if (root == null) {
      return;
    }
    postOrder(root.getLeft());
    postOrder(root.getRight());
    System.out.print(root.getValue());
  }

  public String postOrder(String preOrder, String inOrder) {
    if (preOrder.isEmpty()) {
      return "";
    }

    char rootValue = preOrder.charAt(0);
    int rootIndex = inOrder.indexOf(rootValue);

    return
        postOrder(
            preOrder.substring(1, 1 + rootIndex),
            inOrder.substring(0, rootIndex)) +
        postOrder(
            preOrder.substring(1 + rootIndex),
            inOrder.substring(1 + rootIndex)) +
        rootValue;
  }

  public static void main(String[] args) {
    TreeCreator creator = new TreeCreator();
    TreeTraversal traversal = new TreeTraversal();

    System.out.println("Sample tree traversal");
    System.out.println("=====");
    TreeNode sampleTree = creator.createSampleTree();
    traversal.preOrder(sampleTree);
    System.out.println();
    traversal.inOrder(sampleTree);
    System.out.println();
    traversal.postOrder(sampleTree);
    System.out.println();

    System.out.println("=====");
    System.out.println("Creating tree from preOrder and inOrder");
    System.out.println("=====");
    TreeNode tree = creator.createTree("ABDEGCF", "DBGEACF");
    traversal.postOrder(tree);
    System.out.println();
    traversal.postOrder(creator.createTree("", ""));
    System.out.println();
    traversal.postOrder(creator.createTree("A", "A"));
    System.out.println();
    traversal.postOrder(creator.createTree("AB", "BA"));
    System.out.println();

    System.out.println("=====");
    System.out.println("Generating postOrder directly");
    System.out.println("=====");
    System.out.println(
        traversal.postOrder("ABDEGCF", "DBGEACF"));
    System.out.println(
        traversal.postOrder("", ""));
    System.out.println(
        traversal.postOrder("A", "A"));
    System.out.println(
        traversal.postOrder("AB", "BA"));
  }
}
