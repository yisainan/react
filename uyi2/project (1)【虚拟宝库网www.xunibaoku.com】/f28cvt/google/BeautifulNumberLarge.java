package interview.google;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Scanner;

public class BeautifulNumberLarge {

  public static void main(String[] args) {
    Scanner in = new Scanner(
        new BufferedReader(new InputStreamReader(System.in)));
    int cases = in.nextInt();
    for (int i = 1; i <= cases; ++i) {
      long n = in.nextLong();
      System.out.println("Case #" + i + ": "
          + beautiful(n));
    }
  }

  private static long beautiful(long n) {
    for (int bits = 64; bits >= 2; bits--) {
      long radix = getRadix(n, bits);
      if (radix != -1) {
        return radix;
      }
    }

    throw new IllegalStateException("Should not reach here.");
  }

  /**
   * Gets radix so that n is 111...1 (bits 1 in total) in that
   * radix.
   *
   * @return the radix. -1 if there's no such radix.
   */
  private static long getRadix(long n, int bits) {
    long minRadix = 2;
    long maxRadix = n;
    while (minRadix < maxRadix) {
      long m = minRadix + (maxRadix - minRadix) / 2;
      long t = convert(m, bits);
      if (t == n) {
        return m;
      } else if (t < n) {
        minRadix = m + 1;
      } else {
        maxRadix = m;
      }
    }
    return -1;
  }

  /**
   * Returns the value of 111...1 (bits 1 in total) in radix.
   */
  private static long convert(long radix, int bits) {
    long component = 1;
    long sum = 0;
    for (int i = 0; i < bits; i++) {
      if (Long.MAX_VALUE - sum < component) {
        sum = Long.MAX_VALUE;
      } else {
        sum += component;
      }

      if (Long.MAX_VALUE / component < radix) {
        component = Long.MAX_VALUE;
      } else {
        component *= radix;
      }
    }
    return sum;
  }
}
