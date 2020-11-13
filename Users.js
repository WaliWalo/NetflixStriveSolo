class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
let users = [];
let admin = new User("admin", "123");
users.push(admin);
let myStorage = window.sessionStorage;
let dropdown = document.querySelector("div.dropdown-menu");

login = () => {
  let userEmail = document.querySelector("#email");
  let password = document.querySelector("#password");
  users.forEach((user) => {
    if (user.username === userEmail.value && user.password === password.value) {
      alert("Login Succesful");
      myStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } else {
      alert("wrong password or username");
    }
  });
};

logout = () => {
  myStorage.clear();
  window.location.reload();
};

loginForm = (loggedUser) => {
  if (loggedUser) {
    dropdown.innerHTML = `<a class="dropdown-item" href="#" onclick="logout()">Logout</a>`;
    let active = document.querySelector("li[class*='active']");
    const nav = document.querySelector("ul.navbar-nav");
    if (loggedUser.username === "admin") {
      let li = document.createElement("li");
      li.classList.add("nav-item");
      let a = document.createElement("a");
      if (window.location.href === "http://127.0.0.1:5500/backoffice.html") {
        li.classList.add("active");
        active.classList.remove("active");
      }
      a.classList.add("nav-link");
      a.setAttribute("href", "backoffice.html");
      a.innerHTML = "Backoffice";
      li.appendChild(a);
      nav.appendChild(li);
    }
  } else {
    dropdown.innerHTML = `<form class="px-4 py-3" onsubmit="login()">
                                <div class="form-group">
                                <label for="email">Email address</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="email"
                                    placeholder="email@example.com"
                                />
                                </div>
                                <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="password"
                                    placeholder="Password"
                                />
                                </div>
                                <div class="form-group">
                                <div class="form-check">
                                    <input
                                    type="checkbox"
                                    class="form-check-input"
                                    id="dropdownCheck"
                                    />
                                    <label class="form-check-label" for="dropdownCheck">
                                    Remember me
                                    </label>
                                </div>
                                </div>
                                <button type="submit" class="btn btn-primary">
                                Sign in
                                </button>
                            </form>
                            <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">New around here? Sign up</a>
                                <a class="dropdown-item" href="#">Forgot password?</a>`;
  }
};
