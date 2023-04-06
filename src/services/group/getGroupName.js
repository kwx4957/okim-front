import {api} from "@/api";


export async function getGroupName() {
    try {
        const response = await api.get(`/api/v1/groupname`);
        const groups = response.data.data;
        (`${JSON.stringify(groups)}`);
        return groups;
    } catch (error) {
        console.log(`Error: ${error}`);
        return null;
    }
}