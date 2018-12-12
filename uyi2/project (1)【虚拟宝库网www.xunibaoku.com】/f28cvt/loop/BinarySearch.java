package interview.loop;

public class BinarySearch {

  /**
   * Searches element k in a sorted array.
   * @param arr a sorted array
   * @param k the element to search
   * @return index in arr where k is. -1 if not found.
   */
  public int binarySearch(int[] arr, int k) {
    int a = 0;
    int b = arr.length;
    // Loop invariant: [a, b) is a valid range. (a <= b)
    // k may only be within range [a, b).
    while (a < b) {
      int m = a + (b - a) / 2; // m = (a + b) / 2 may overflow!
      if (k < arr[m]) {
        b = m;
      } else if (k > arr[m]) {
        a = m + 1;
      } else {
        return m;
      }
    }
    return -1;
  }

  public static void main(String[] args) {
    BinarySearch bs = new BinarySearch();

    System.out.println("Testing normal data");
    System.out.println(
        bs.binarySearch(new int[]{1, 2, 10, 15, 100}, 15));
    System.out.println(
        bs.binarySearch(new int[]{1, 2, 10, 15, 100}, -2));
    System.out.println(
        bs.binarySearch(new int[]{1, 2, 10, 15, 100}, 101));
    System.out.println(
        bs.binarySearch(new int[]{1, 2, 10, 15, 100}, 13));
    System.out.println("======");

    System.out.println("Testing empty or singleton data.");
    System.out.println(
        bs.binarySearch(new int[]{}, 13));
    System.out.println(
        bs.binarySearch(new int[]{12}, 13));
    System.out.println(
        bs.binarySearch(new int[]{13}, 13));
    System.out.println("======");

    System.out.println("Testing data of size 2.");
    System.out.println(
        bs.binarySearch(new int[]{12, 13}, 13));
    System.out.println(
        bs.binarySearch(new int[]{12, 13}, 12));
    System.out.println(
        bs.binarySearch(new int[]{12, 13}, 11));
  }
}
