/* GOOGLE */

const query = document.getElementById("query");
const searchBtn = document.getElementById("searchBtn");

searchBtn.onclick = function() {
    let url = "https://www.google.com/search?q=" + query.value;
    window.open(url);
}

document.querySelector(".search-barGoogle").addEventListener("keyup", function() {
    if(event.key == "Enter") {
        searchBtn.onclick();
    }
})

/* END */

                                        /* ----- */

/* WEATHER */

window.onload = function() {
    weather.search();
};

let weather = {
    "apiKey": "c5e1c01ad608f6a0ea9e64ee01591ec4",

    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&lang=sv&units=metric&appid="
            + this.apiKey
        )
            .then((response) => response.json())

            .then((data) => this.displayWeather(data))
    },

    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log(name, icon, description, temp, humidity, speed);

        document.querySelector(".city").innerText = "Vädret i " + name;

        /* document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +"@2x.png"; */

        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Fuktighet: " + humidity + "%";
        document.querySelector(".wind").innerText = "Vind: " + speed + " m/s";
    },

    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function() {
        weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function() {
    if(event.key == "Enter") {
        weather.search();
    }
})

/* END */

                                        /* ----- */

/* TODO */

const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        todosUL.appendChild(todoEl);

        input.value = "";

        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll("li");
    
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

/* END */

                                        /* ----- */

/* CLOCK */

function displayTime() {
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();

    document.getElementById("hours").innerHTML = hrs;
    document.getElementById("minutes").innerHTML = min;
    document.getElementById("seconds").innerHTML = sec;
}
setInterval(displayTime, 10);