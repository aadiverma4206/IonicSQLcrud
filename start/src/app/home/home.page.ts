import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})

export class HomePage implements OnInit {

  name: string = '';
  email: string = '';
  users: any[] = [];

  selectedUserId: number | null = null;   // 🔥 update ke liye add kiya

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  // ✅ INSERT (unchanged)
  addUser() {
    const data = {
      name: this.name,
      email: this.email
    };

    this.http.post('http://localhost:3000/add-user', data)
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.name = '';
          this.email = '';
          this.getUsers();
        },
        (error) => {
          console.error(error);
          alert("Error adding user ");
        }
      );
  }

  // ✅ READ
  getUsers() {
    this.http.get('http://localhost:3000/get-users')
      .subscribe(
        (res: any) => {
          this.users = res;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  // 🔥 EDIT (form me data fill karega)
  editUser(user: any) {
    this.name = user.name;
    this.email = user.email;
    this.selectedUserId = user.id;
  }

  // 🔥 UPDATE
  updateUser() {

    if (!this.selectedUserId) return;

    const data = {
      name: this.name,
      email: this.email
    };

    this.http.put(`http://localhost:3000/update-user/${this.selectedUserId}`, data)
      .subscribe(
        (res: any) => {
          alert(res.message);
          this.name = '';
          this.email = '';
          this.selectedUserId = null;
          this.getUsers();
        },
        (error) => {
          console.error(error);
          alert("Update failed ");
        }
      );
  }

  deleteUser(id: number) {

  this.http.delete(`http://localhost:3000/delete-user/${id}`)
    .subscribe(
      (res: any) => {
        alert(res.message);
        this.getUsers();  // 🔥 delete ke baad refresh
      },
      (error) => {
        console.error(error);
        alert("Delete failed ");
      }
    );

}
}