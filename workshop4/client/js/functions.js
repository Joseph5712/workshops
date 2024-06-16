function assignEditEvents() {
    for (let el of document.getElementsByClassName('edit_button')) {
        el.addEventListener('click', (e) => {
        console.log(e.target.id);
        alert(`element with id ${e.target.id} clicked`);
        e.preventDefault();
        });
    }
  }
  
  async function getCourses() {
    const response = await fetch("http://localhost:3001/api/courses");
    const teachers = await response.json();
    //console.log('cousers:', teachers);
  
    if(teachers) {
      const container = document.getElementById('result');
      container.innerHTML = '';
      teachers.forEach(element => {
        const item = document.createElement('li');
        item.innerHTML = `${element.name} <a href="" class="edit_button" id="${element._id}">Edit</a>`;
        item.setAttribute('data-id',element._id);
        container.appendChild(item)
      });
  
      assignEditEvents();
    }
  }
  
  async function createCourse() {
    let course =  {
      name: document.getElementById('name').value,
      credits: document.getElementById('credits').value
    }

    const response = await fetch("http://localhost:3001/api/courses",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    });
  
    //debugger;
    //if(response && response.status == 201){
    //    course = await response.json();
    //  console.log('Course saved', course);
    //  alert('Course guardado');
    //} else {
    //  alert("Shit's on fire! ");
    //}
    assignEditEvents();
  }