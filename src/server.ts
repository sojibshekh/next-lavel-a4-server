
import app from './app';
import mongoose from 'mongoose';



const PORT =8000;
async function main(){
    try{

        await mongoose.connect('mongodb+srv://sojib:sojib@cluster0.efnk5.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to MongoDB useing Mongoose');
         app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        }catch(error){
       console.log(error);
    }
}

main();