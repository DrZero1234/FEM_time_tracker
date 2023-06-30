const sched_day = document.getElementById("sched-opt-d");
const sched_week = document.getElementById("sched-opt-w");
const sched_month = document.getElementById("sched-opt-m");

const schedule_wrapper = document.querySelector(".user-schedule");




const toggle_active = (e) => {
    const active = schedule_wrapper.querySelector(".active");
    if (active) {
        active.classList.remove("active");
        e.classList.toggle("active")
    } else {
        e.classList.toggle("active")
    }
}

const changeDom = async (timeframe_type) => {
    try {
        const key = await timeframe_type;
        const fetch_data = await fetch("./data.json");
        const json = await fetch_data.json();

        json.forEach((data) => {
            const timeframe_data = data.timeframes[key]
            let timeframe_text
            switch (key) {
                case "monthly":
                    timeframe_text = "Month"
                    break;
                case "weekly":
                    timeframe_text = "Week"
                    break;
                case "daily":
                    timeframe_text = "Day"
                    break;
                default:
                    break;
            }
            const parent_div = document.getElementById(data.title.toLowerCase());


            const hours_num = parent_div.querySelector("#section-hours");
            const last_time = parent_div.querySelector("#section-last-time")  || false;
            const timeframe_type = parent_div.querySelector("#timeframe-type");

            hours_num.textContent = timeframe_data.current;
            last_time.textContent = timeframe_data.previous
            timeframe_type.textContent = timeframe_text
        })
    } catch (error) {
        console.error(error)    
    }
}

const handleClick = e => {
    const {currentTarget} = e
    const json_key = currentTarget.dataset.json_key.toString()
    changeDom(json_key)
    //console.log(json_key)
   toggle_active(currentTarget);
}

[sched_day,sched_month,sched_week].forEach((elem) => (
    elem.addEventListener("click", (e) => {
        handleClick(e)
    })
))

changeDom("weekly")

/*
fetch("./data.json")
    .then((response) => response.json())
    .then((category_data) => 
        category_data.forEach((data) => {
            const parent_div = document.getElementById(data.title.toLowerCase());
            console.log(parent_div)
            const hours_num = parent_div.querySelector("#section-hours");
            console.log(hours_num)

            const time = parent_div.querySelector(".section-time");

        })
    )

*/