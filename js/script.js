window.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    function req(e) {

        e.preventDefault(); // Чтобы форма не перезагружала страницу при нажатии кнопки.

        let formData = new FormData(form);
        formData.append("id", Math.random()); // просто чтобы показать, что мы можем аппендить в объект formdata пару ключ значение.
        // Дальше мы не можем просто сделать  let json = JSON.stringify(formData). Это работать не будет. Если мы хоти отправить объект formdata в json файл, нужно сделать то что ниже. Просто перезаписать все в обычный js объект, а затем js объект переделать в json формат.

        let obj = {};
        
        formData.forEach((value, key) => {
            obj[key] = value;
        });

        // getResources("http://localhost:3000/people")
        //     .then(data => createCards(data.data)) // axios дает нам много свойств вместе с самими данными, поэтому нужно точно указать свойство с данными.
        //     .catch(err => console.error(err));

        axios.post("http://localhost:3000/people", obj); // Для axios достаточно одной строки
        
    }

    form.addEventListener("submit", (e) => req(e), {"once": true});
    
    async function getResources(url) {
        const res = await axios(`${url}`);

        if (res.status !== 200) { 
            throw new Error(`Could not fetch ${url}, status: ${res.status}`); 
        }

        return res;  // axios автоматически конвертирует данные из json в самый обычный объект.
    }

    function createCards(data) {
        data.forEach(item => {
            let card = document.createElement("div");

            card.classList.add("card");

            let icon;
            if (item.sex == "male") {
                icon = "icons/mars.png";
            } else {
                icon = "icons/female.png";
            }

            card.innerHTML = `
                <img src ="${item.photo}" alt="photo">
                <div class"name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="male">
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector(".app").appendChild(card);
        });
    }
});