import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required]
    });
  }

  AddCategory() {
    console.log(this.categoryForm.value);
  }

}
