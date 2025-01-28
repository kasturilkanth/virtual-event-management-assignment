const events=require('../models/events');

exports.createEvent=(req,res)=>{
    const {date,time,description}=req.body;
    if(req.user.role!=="organizer"){
        return res.status(403).json({error:"Only organizers can create events."});
    }
    const event={
        id:events.length+1,
        date,
        time,
        description,
        participants:[]
    };
    events.push(event);
    res.status(201).json({message:'event created successfully',event});
}

exports.updateEvent=(req,res)=>{
    const {id}=req.params;
    const {date,time,description}=req.body;
    const event=events.find(event=>event.id===parseInt(id));
    if(!event){
        return res.status(404).json({error:'Event not found'});
    }
    if(req.user.role!=="organizer"){
        return res.status(403).json({error:"Only organizers can update events."});
    }
    Object.assign(event,{date,time,description});
    res.json({message:'Event updated successfully',event});
}
exports.deleteEvent=(req,res)=>{
    const {id}=req.params;
    const eventIndex=events.findIndex(event=>event.id===parseInt(id));
    if(eventIndex===-1){
        return res.status(404).json({error:'Event not found'});
    }
    if(req.user.role!=="organizer"){
        return res.status(403).json({error:"Only organizers can delete events."});
    }
    events.splice(eventIndex,1);
    res.json({message:'Event deleted successfully'});
}
exports.registerForEvent=(req,res)=>{
    const {id}=req.params;
    const event=events.find(event=>event.id===parseInt(id));
    if(!event){
        return res.status(404).json({error:'Event not found'});
    }
    if(event.participants.includes(req.user.id)){
        return res.status(400).json({error:'You are already registered for this event.'});
    }
    event.participants.push(req.user.id);
    res.json({message:'Registered for the event successfully',event});
}