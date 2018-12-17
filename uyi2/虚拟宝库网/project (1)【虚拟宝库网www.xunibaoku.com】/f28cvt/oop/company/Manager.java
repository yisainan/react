package interview.oop.company;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Manager extends Employee {
  private final List<Employee> reporters;

  public Manager(String name, int salary,
      List<Employee> reporters) {
    super(name, salary);
    this.reporters = Collections.unmodifiableList(
        new ArrayList<>(reporters));
  }

  @Override
  public void getPaid(BankEndPoint bank) {
    super.getPaid(bank);
    getStocks();
  }

  @Override
  public void doWork() {
    Employee worker = selectReporter();
    worker.doWork();
  }

  @Override
  public String toString() {
    return "Manager [name=" + getName()
        + ", salary=" + getSalary() + "]";
  }

  private Employee selectReporter() {
    loadReporters();
    return null;
  }

  private void getStocks() {
  }

  private void loadReporters() {
    reporters.clear();
    reporters.add(new Employee("John", 10000));
    reporters.add(new Employee("Mary", 20000));
  }
}
