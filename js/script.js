window.addEventListener("DOMContentLoaded", () => {
    function req() {
        getResources("http://localhost:3000/people")
            .then(data => createCards(data.data)) // axios дает нам много свойств вместе с самими данными, поэтому нужно точно указать свойство с данными.
            .catch(err => console.error(err));
        
        this.remove();
    }

    document.querySelector("button").addEventListener("click", req, { "once": true });
    
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