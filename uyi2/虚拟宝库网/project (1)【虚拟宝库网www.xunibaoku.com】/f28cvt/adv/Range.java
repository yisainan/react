package interview.adv;

import java.util.Iterator;
import java.util.NoSuchElementException;

public class Range implements Iterable<Long> {
  private final long start;
  private final long end;
  private final long step;

  public Range(long start, long end, long step) {
    super();
    this.start = start;
    this.end = end;
    this.step = step;
  }

  @Override
  public Iterator<Long> iterator() {
    return new RangeIterator();
  }

  private class RangeIterator implements Iterator<Long> {
    private long current;

    public RangeIterator() {
      current = start;
    }

    @Override
    public boolean hasNext() {
      return current < end;
    }

    @Override
    public Long next() {
      if (current >= end) {
        throw new NoSuchElementException();
      }

      long value = current;
      current += step;
      return value;
    }
  }
}
