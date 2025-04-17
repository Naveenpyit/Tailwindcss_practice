function submit(event){
    event.preventDefault();
    const fname = document.getElementById('firstname').value;
    const lname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;
    const gender = document.getElementById('gender').value;
    const mode = document.getElementById('mode').value;
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const payload={
        'fname':fname,
        'lname':lname,
        'email':email,
        'city':city,
        'country':country,
        'gender':gender,
        'mode':mode
    };
    console.log(payload);
    fetch('/av7/submit_register/',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken
        },
        body:JSON.stringify(payload),
    })
    .then(response =>{
        if (!response.ok){
            alert('Invalid Details');
        }
        return response.json();
    })
    .then(data =>{
        if (data.status == 1){
            alert('Data Submitted Successfully!');
        }
        else{
            alert("Not Submitted!");
        }
    })
    .catch(err =>{
        alert('Catch error',err);
    })
}

function show_image(event){
    console.log('Iam running!')
    const file = event.target.files[0];
    if (file){
        console.log('File ready!')
        const imgpreview = document.getElementById('preview');
        const text = document.getElementById('upload_text');
        imgpreview.src = URL.createObjectURL(file);
        imgpreview.classList.remove('hidden');
        text.classList.add('hidden');
    }
}
function fetch_post_method(url,payload){
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken':csrftoken,
        },
        body:JSON.stringify(payload)
    })
}
function load_employee(emp_details){
    let data_list = []
    const input = document.getElementById('loaddetails');
    if (String(emp_details) < 3 ){
        return;
    }
    if(isNaN(emp_details)){
        emp_detail = emp_details.toUppercase();
    }
    const response = fetch_post_method('/av7/get_filter_data/',emp_details);
    data_list = response.json()

    // let filterd_data = EmpData.filter((emp) =>
    //     emp['EMPNAME'].toLowerCase().includes(emp_detail.toLowerCase()) ||
    //     String(emp['EMPCODE']).includes(String(emp_detail))
    // );
    let list = '';
    let filterd_data = data_list.filter((emp =>
        emp['empname'].toLowerCase().includes(emp_details.toLowerCase()) ||
        String(emp['empcode']).includes(String(emp_details))       
    ))
    
    filterd_data.map(e =>{
        list += `<list class="rounded-md w-[300px] border-2 border-gray-300">`
    })

}