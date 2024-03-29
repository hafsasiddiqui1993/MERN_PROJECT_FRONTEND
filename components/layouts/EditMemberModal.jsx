import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import myurl from "../../public/routes"

export default function EditMemberModal() {

const [memberUpdate, setmemberUpdate] = useState({
   id:"", m_fullname:"", m_add:"", m_ph:"", m_email:"", m_pass:""
});

const {id} = useParams();

const HandleChange = async(e) => {
    console.log(e.target.name)
    let value = e.target.value;

    setmemberUpdate({...memberUpdate, [e.target.name]:value});

}

React.useEffect(()=>{
    async function getmemberData(){
        const res = await fetch(
          myurl+`api/member/registers?id=${id}`,

            {   
                headers:{
                method: "GET",
                "Content-Type": "application/json",
                Tokenization: localStorage.getItem("Token"),
                },
                
            }
        );
        const data = await res.json();
        console.log("Data", data)

        setmemberUpdate((prev)=>{
            return{
                ...prev,
                m_fullname:data.m_fullname,
                m_add:data.m_add,
                m_ph:data.m_ph,
                m_email:data.m_email,
                m_pass:data.m_pass

            }
        });
    }
    getmemberData();
}, []);



const updatememberItem = async(e) => {

    e.preventDefault();
    const {m_fullname,m_add,m_ph,m_email,m_pass} = memberUpdate;
    console.log("Member Updated Data", m_fullname,m_add,m_ph,m_email,m_pass)
    //  console.log(`https://real-red-shrimp-cuff.cyclic.app/api/member/member/editprofile/`+id)

    try{
        const updatedmember = await fetch(
          myurl+`api/member/member/editprofile/`+id,

          //  `https://real-red-shrimp-cuff.cyclic.app/api/member/member/editprofile/${id}`,
           
      {
        method: "PUT",
        headers: {
            Tokenization: localStorage.getItem("Token"),
            'Content-Type': 'application/json'

        },

        body:JSON.stringify({
        id:id, 
        m_fullname:memberUpdate.m_fullname,
        m_add:memberUpdate.m_add,
        m_ph:memberUpdate.m_ph,
        m_email:memberUpdate.m_email,
        m_pass:memberUpdate.m_pass
        })
    
      });

      const data01 = await updatedmember.json();
      console.log(data01)
      updatememberItem();

      if (updatedmember.status === 404 || !updatedmember) {
        window.alert("invalid");
      } else {
        window.alert("Member Successfully updated his profile!");
      }
 
    } catch(error){
        console.log(error);
    }


}; 


  return (
    <body className='editbdy'>
    <img className='ediproimg' src='https://i.pinimg.com/736x/9b/97/a5/9b97a5c89b5dec92b69511b90c0915e3.jpg'></img>
    <Form className="editpro" onChange={(e) => HandleChange(e)}>
        
    <Form.Group className="mb-3">
          <Form.Control className='editcntrlpro'
          id="m_fullname"
          name="m_fullname"
          type="text" placeholder="Enter Full Name"
          value={memberUpdate.m_fullname}
          />
      
 
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control className='editcntrlpro'
          id="m_add"
          name="m_add"
          type="text" placeholder="Enter Address"
          value={memberUpdate.m_add}

          />

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control className='editcntrlpro'
          id="m_ph"
          name="m_ph"
          type="text" placeholder="Enter Phone" 
          value={memberUpdate.m_ph}

          />
  
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Control className='editcntrlpro'
          id="m_email"
          name="m_email"
          type="email" placeholder="Enter Email" 
          value={memberUpdate.m_email}

          />
  
        </Form.Group>
  
        <Form.Group className="mb-3">
          <Form.Control className='editcntrlpro'
          id="m_pass"
          name="m_pass"
          type="password"  placeholder="Enter Password" 
          value={memberUpdate.m_pass}

          />

  
        </Form.Group>
  
      <Button className='actvty-btn'  onClick={updatememberItem} value="Signup" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </body>

    
  )
}
