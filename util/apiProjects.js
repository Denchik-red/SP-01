import api from './getApi'
import * as apiItem from './apiItem'

export async function getProjects() {
    const resProjects = await api.get("/collections/projects/records")
    console.log("Get project: ", resProjects.data)
    return resProjects.data
}


export async function newProject({title, type, date_start, date_end, size, description_source, technical_drawing}) {
    const form = new FormData();
    form.append("title", title);
    form.append("type", type);
    form.append("date_start", date_start);
    form.append("date_end", date_end);
    form.append("size", size);
    form.append("description_source", description_source);
    form.append("technical_drawing", "");
    form.append("user_id", await apiItem.getItem("userId"));
    
    const resProjects = await api.post("/collections/projects/records", form)
    console.log("Update project: ", resProjects.data)
    return resProjects.data
}