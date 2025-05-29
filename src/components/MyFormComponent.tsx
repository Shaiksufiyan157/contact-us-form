'use client'

import React, { useEffect } from "react"

import { useState } from "react"

const MyFormComponent=({formId}:{formId:string})=>{

const [cmsForm, setCmsForm] = useState<any>(null)
const [error, setError] = useState<string | null>(null)
// const {cmsForm,setCmsForm}=useState<any>(null)
// const {error,setError}=useState<string |null>(null)

useEffect(()=>{
fetch(`/api/forms/${formId}`)
.then((res)=>res.json())
.then((data)=>{
setCmsForm(data)
console.log('Form data:', data)
})
.catch((err)=>setError('Error loading form'))
},[formId])

// const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
// e.preventDefault()
// const formData = new FormData(e.currentTarget)
// const dataTosend=Array.from(formData.entries()).map(([name,value])

// })


const handleSubmit= async(e:React.FocusEvent<HTMLFormElement>)=>{
e.preventDefault()
const formData=new FormData(e.currentTarget)
const dataTosend=Array.from(formData.entries()).map(([name,value])=>({
field:name,
value:value.toString()
}))

// console.log('to send data',dataTosend)

const response=await fetch('/api/form-submissions',{

method:'POST',
body:JSON.stringify({
form:formId,
submissionData:dataTosend
}),
headers:{
'Content-type':'application/json'
}

})
console.log(response)
console.log('to send data',dataTosend)

}
return(
<div>
<h1>Form</h1>
<form onSubmit={handleSubmit}>
  {cmsForm?.fields?.map((field: any) => {
    return (
      <div key={field.id}>
        <label htmlFor={field.id}>{field.label}</label>
        <input
          type={field.blockType}
          id={field.id}
          name={field.name}
          required={field.required}
        />
      </div>
    );
  })}
  <button type="submit">Submit</button>
</form>
</div>

)

}

export default MyFormComponent