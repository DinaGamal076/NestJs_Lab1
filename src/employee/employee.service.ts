import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './employee.interface';
import { employees as staticEmployees } from './data';

@Injectable()
export class EmployeeService {
  private employees = [...staticEmployees];

  findAll(): Employee[] {
    return this.employees;
  }

  findOne(id: number): Employee {
    const emp = this.employees.find(e => e.id === id);
    if (!emp) throw new NotFoundException('Employee not found');
    return emp;
  }

  create(emp: Employee): Employee {
    this.employees.push(emp);
    return emp;
  }

  update(id: number, data: Partial<Employee>): Employee {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) throw new NotFoundException('Not found');
    this.employees[index] = { ...this.employees[index], ...data };
    return this.employees[index];
  }

  remove(id: number) {
    const index = this.employees.findIndex(e => e.id === id);
    if (index === -1) throw new NotFoundException('Not found');
    this.employees.splice(index, 1);
  }

  getHighestPaid(): Employee {
    return this.employees.reduce((prev, curr) => (curr.salary > prev.salary ? curr : prev));
  }
}