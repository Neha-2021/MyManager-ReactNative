const baseURL = `http://192.168.0.102:3000/mymanager-frontend`;

export const loadTask = () => {
    return fetch(baseURL).then((response) => response.json())
}

export const getTask = (id : any) => {
    return fetch(`${baseURL}/${id}`).then((response) => response.json());
}

export const createTask = (task: any) => {
    return fetch(baseURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: task.title,
            completed: task.completed,
        }),
    }).then((response) => response.json());
}

export const updateTask = (task: any) => {
    return fetch(`${baseURL}/${task.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: task.id,
            title: task.title,
            completed: task.completed,
        }),
    }).then((response) => response.json());
}

export const deleteTask = (id: any) => {
    return fetch(`${baseURL}/${id}`, {
        method: "DELETE",
    }).then((response) => response.json());
}