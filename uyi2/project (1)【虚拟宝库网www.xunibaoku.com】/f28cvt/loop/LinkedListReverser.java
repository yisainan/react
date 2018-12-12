package interview.loop;

import java.util.ArrayList;
import java.util.Arrays;

import interview.common.Node;
import interview.recursion.LinkedListCreator;

public class LinkedListReverser {

  public <T> Node<T> reverseLinkedList(Node<T> head) {
    Node<T> newHead = null;
    Node<T> curHead = head;
    // Loop invariant:
    // newHead points to the linked list already reversed.
    // curHead points to the linked list not yet reversed.

    // Loop invariant holds.
    while(curHead != null) {
      // Loop invariant holds.
      Node<T> next = curHead.getNext();
      curHead.setNext(newHead);
      newHead = curHead;
      curHead = next;
      // Loop invariant holds.
    }
    // Loop invariant holds.
    return newHead;
  }

  public static void main(String[] args) {
    LinkedListCreator creator = new LinkedListCreator();
    LinkedListReverser reverser = new LinkedListReverser();

    Node.printLinkedList(reverser.reverseLinkedList(
        creator.createLinkedList(new ArrayList<>())));

    Node.printLinkedList(reverser.reverseLinkedList(
        creator.createLinkedList(Arrays.asList(1))));

    Node.printLinkedList(reverser.reverseLinkedList(
        creator.createLinkedList(Arrays.asList(1, 2, 3, 4, 5))));

    reverser.reverseLinkedList(
        creator.createLargeLinkedList(1000000));
    System.out.println("done");
  }
}
