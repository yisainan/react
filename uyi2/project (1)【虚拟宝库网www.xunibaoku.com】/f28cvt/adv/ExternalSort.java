package interview.adv;

import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.PriorityQueue;

public class ExternalSort {

  private class ResultEntry<T extends Comparable<T>>
      implements Comparable<ResultEntry<T>> {
    private final T value;
    private final Iterator<T> source;

    public ResultEntry(T value, Iterator<T> source) {
      this.value = value;
      this.source = source;
    }

    @Override
    public int compareTo(ResultEntry<T> o) {
      // compare only value with o.value
      return value.compareTo(o.value);
    }
  }

  private class MergeResultIterator<T extends Comparable<T>>
      implements Iterator<T> {
    private final PriorityQueue<ResultEntry<T>> queue;

    public MergeResultIterator(List<Iterable<T>> sortedData) {
      // Collect minimum data in each sortedData.
      queue = new PriorityQueue<>();
      for (Iterable<T> data : sortedData) {
        Iterator<T> iterator = data.iterator();
        if (iterator.hasNext()) {
          queue.add(
              new ResultEntry<>(iterator.next(), iterator));
        }
      }
    }

    @Override
    public boolean hasNext() {
      return !queue.isEmpty();
    }

    /** Finds minimum data in our collection. */
    @Override
    public T next() {
      if (queue.isEmpty()) {
        throw new NoSuchElementException();
      }

      ResultEntry<T> entry = queue.poll();

      // Replace extracted data with next minimum in its source.
      if (entry.source.hasNext()) {
        queue.add(new ResultEntry<>(
            entry.source.next(), entry.source));
      }
      return entry.value;
    }
  }

  public <T extends Comparable<T>> Iterable<T> merge(
      List<Iterable<T>> sortedData) {
    return new Iterable<T>() {
      @Override
      public Iterator<T> iterator() {
        return new MergeResultIterator<>(sortedData);
      }
    };
  }

  public static void main(String[] args) {
    Iterable<Long> data1 = new Range(1L, 1000000000000L, 1L);
    Iterable<Long> data2 = new Range(1L, 1000000000000L, 2L);
    Iterable<Long> data3 = new Range(1L, 1000000000000L, 3L);
    Iterable<Long> data4 = new Range(1L, 1000000000000L, 5L);
    Iterable<Long> data5 = new Range(1L, 1000000000000L, 7L);

    Iterable<Long> smallData1 = new Range(1L, 10L, 1L);
    // 1, 2, 3, 4, 5, ... 9

    Iterable<Long> smallData2 = new Range(1L, 10L, 2L);
    // 1, 3, 5, 7, 9

    ExternalSort sort = new ExternalSort();

    System.out.println("Testing small data set.");
    Iterable<Long> resultSmall = sort.merge(
        Arrays.asList(smallData1, smallData2));
    printInitialResults(resultSmall, 100);

    System.out.println("Testing normal data set.");
    Iterable<Long> result = sort.merge(
        Arrays.asList(data1, data2, data3, data4, data5));
    printInitialResults(result, 100);

    System.out.println("Testing normal data set again.");
    Iterable<Long> anotherResult =
        sort.merge(Arrays.asList(
            sort.merge(Arrays.asList(data1, data2)),
            sort.merge(Arrays.asList(data3, data4)),
            data5));
    printInitialResults(anotherResult, 100);
  }

  private static void printInitialResults(
      Iterable<Long> resultSmall, int resultsToPrint) {
    int count = 0;
    for (Long value : resultSmall) {
      System.out.print(value);
      System.out.print(" ");
      count++;
      if (count >= resultsToPrint) {
        break;
      }
    }
    System.out.println();
  }
}
