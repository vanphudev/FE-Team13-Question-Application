import Box from "@mui/material/Box";
import React, {useEffect} from "react";
import ListCardQuestion from "../components/MainContent/listCardQuestion";
import mockData from "../data/mockData.js";
import axiosInstance from "../apis/index.js";
import {useState} from "react";
const Main = () => {
   const [listQuestions, setListQuestions] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   useEffect(() => {
      const fetchQuestions = async () => {
         try {
            const response = await axiosInstance.get("/questions/get-all");
            if (response.status === 200) {
               setListQuestions(response.data.data);
               setLoading(false);
            }
         } catch (err) {
            console.error("Failed to fetch questions:", err);
            setError(err);
            setLoading(false);
         }
      };
      fetchQuestions();
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error fetching questions: {error.message}</p>;

   return (
      <>
         <Box
            sx={{
               backgroundColor: (theme) =>
                  theme.mode === "dark" ? theme.colorSchemes.dark.bg.body : theme.colorSchemes.light.bg.secondary,
               width: "100%",
               overflow: "hidden",
               height: "max-content",
               padding: "10px",
               paddingLeft: "50px",
               paddingRight: "50px",
               margin: "0 auto",
            }}>
            <ListCardQuestion listQuestions={listQuestions} setListQuestions={setListQuestions} />
         </Box>
      </>
   );
};
export default Main;
