import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import myurl from "../../../public/routes"

import { useState } from 'react';

function ActivityForm() {

  const [activity, setactivity] = useState({
   
  exe_ac_name:"", exe_ac_desc:"", exe_ac_type:"",exe_ac_dur:"",exe_ac_date:""

  });


const HandleInputChange = async(e) => {
console.log(e.target.name)

let value = e.target.value;



setactivity({...activity, [e.target.name]:value});
}

const ActivityData = async (e) => {
  e.preventDefault();




const {exe_ac_name,exe_ac_desc,exe_ac_type,exe_ac_dur,exe_ac_date} = activity;
console.log(activity)

try{
 
    //If file selected then create FormData
    // const fileToUpload = singleFile;
    let data1 = new FormData();
    data1.append('exe_ac_name',exe_ac_name);
    data1.append('exe_ac_desc',exe_ac_desc);
    data1.append('exe_ac_type',exe_ac_type);
    data1.append('exe_ac_dur',exe_ac_dur);
    data1.append('exe_ac_date',exe_ac_date);

console.log()
const res = await fetch(myurl+"api/activity/member/exercise_activity",{
method: "POST",

headers:{

  
  'Tokenization': localStorage.getItem('Token'),
  "Content-type":"application/json"

},
body: JSON.stringify(activity)
});
const data = await res.json();
console.log("data")
console.log(data)



// if(res.status === 404 || !res){
//   window.alert("invalid");

// } else {
  window.alert("Activity Successfully Add!");
// }

} catch(e){
  // console.log(e)
}
}



  return (

    <> 
    <Form className='actvty-frm' onChange={(e) => HandleInputChange(e)}>
        
 
        <Form.Group className='lblactvty'  as={Col} >
          <Form.Label> Exercise Activity Name</Form.Label>
          <Form.Control                                                                                                                                            
          id="exe_ac_name"
          name="exe_ac_name"
          type="text" placeholder="Exercise Activity Name" />
        </Form.Group>
 
          
        <Form.Group className='lblactvty'  as={Col} >
          <Form.Label>Exercise Activity Description</Form.Label>
          <Form.Control 
           id="exe_ac_desc"
           name="exe_ac_desc"
          type="text" placeholder="Exercise Activity Description"  />
        </Form.Group>
  
        

       
        <Form.Group className='lblactvty'  as={Col} >
          <Form.Label>Exercise Activity Types</Form.Label>
          <Form.Control 
           id="exe_ac_type"
           name="exe_ac_type"
          type="hidden" placeholder="Exercise Activity Type"  />
          <Form.Select defaultValue="Choose..." name="exe_ac_type">
            <option>Choose Activity Type</option>
            <option>Run</option>
            <option>Bicycle Ride</option>
            <option>Swim</option>
            <option>Walk</option>
            <option>Hike</option>

          </Form.Select>


        </Form.Group>
        <Form.Group className='lblactvty'   as={Col} >
          <Form.Label>Exercise Activity Duration</Form.Label>
          <Form.Control
           id="exe_ac_dur"
           name="exe_ac_dur"
          type="hidden" placeholder="Exercise Activity Type" />
          <Form.Select defaultValue="Choose..."  name="exe_ac_dur">
            
            <option>Choose Exercise Activity Duration</option>
            <option>4 Weeks</option>
            <option>8 Weeks</option>
            <option>3 Months</option>
            <option>6 Months</option>


          </Form.Select>
        </Form.Group>


        
        <Form.Group className='lblactvty'  as={Col} >
          <Form.Label>Exercise Activity Date</Form.Label> 
          
          <Form.Control className='lblactvty'
           id="exe_ac_date"
           name="exe_ac_date"
          type="date" placeholder="Exercise Activity Date"  />
        </Form.Group>

        

      <Button className='actvty-btn'  onClick={ActivityData} value="ActivityForm" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  );
}

export default ActivityForm;
