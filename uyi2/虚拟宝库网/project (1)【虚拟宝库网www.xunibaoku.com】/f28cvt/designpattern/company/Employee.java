package interview.designpattern.company;

import java.util.List;
import java.util.Objects;

public class Employee {
  public static List<Employee> allEmployees;

  private final String name;
  private final int salary;
  private Role role;

  public Employee(String name, int salary, Role role) {
    this.name = name;
    this.salary = salary;
    this.role = role;
  }

  public void doWork() {
    role.doWork();
  }

  public void getPaid(BankEndPoint bank) {
    bank.payment(name, salary);
  }

  // Package private for logic in the package to control
  // when employees are loaded.
  static void loadAllEmployees() {
    // Loads all employees from database.
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, salary, role);
  }

  @Override
  public boolean equals(Object obj) {
    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    if (getClass() != obj.getClass()) {
      return false;
    }
    Employee other = (Employee) obj;
    return Objects.equals(this.name, other.name)
        && Objects.equals(this.salary, other.salary)
        && Objects.equals(this.role, other.role);
  }

  @Override
  public String toString() {
    return "Employee [name=" + name
        + ", salary=" + salary
        + ", role=" + role + "]";
  }

  public String getName() {
    return name;
  }

  public int getSalary() {
    return salary;
  }

  public Role getRole() {
    return role;
  }

  public void setRole(Role role) {
    this.role = role;
  }
}
