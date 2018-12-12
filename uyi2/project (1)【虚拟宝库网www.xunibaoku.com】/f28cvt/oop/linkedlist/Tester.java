package interview.oop.linkedlist;

public class Tester {

  public static void main(String[] args) {
    LinkedList<Integer> list = LinkedList.newEmptyList();
    for (int i = 0; i < 100; i++) {
      list.add(i);
    }

    for (Integer value : list) {
      System.out.println(value);
    }

    LinkedList<String> stringList = LinkedList.newEmptyList();
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 100; i++) {
      sb.append("a");
      stringList.add(sb.toString());
    }

    for (String value : stringList) {
      System.out.println(value);
    }
  }
}
