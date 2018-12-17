package interview.designpattern.company;

public class Engineer implements Role {

  @Override
  public void doWork() {
    System.out.println("Doing engineer work.");
  }

  @Override
  public String toString() {
    return "Engineer";
  }
}
