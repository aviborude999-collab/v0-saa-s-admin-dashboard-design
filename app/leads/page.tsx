"use client"
import { useEffect, useState } from "react"

export default function Leads(){

const [leads,setLeads] = useState([])
const API="https://sheetdb.io/api/v1/abcd1234"

useEffect(()=>{
loadLeads()
},[])

async function loadLeads(){

const res = await fetch(API)
const data = await res.json()

setLeads(data)

}

async function addLead(){

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
data:{
Name:"New Customer",
Phone:"9999999999",
Status:"New"
}
})
})

loadLeads()

}

return(

<div>

<h1>CRM Leads</h1>

<button onClick={addLead}>
Add Lead
</button>

<table border="1">

<thead>

<tr>
<th>Name</th>
<th>Phone</th>
<th>Status</th>
</tr>

</thead>

<tbody>

{leads.map((lead,i)=>(
<tr key={i}>
<td>{lead.Name}</td>
<td>{lead.Phone}</td>
<td>{lead.Status}</td>
</tr>
))}

</tbody>

</table>

</div>

)

}
