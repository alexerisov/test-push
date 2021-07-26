import React from 'react';
import classes from "./index.module.scss";
import { useRouter } from 'next/router';
import Link from "next/link";

const RecipeNotFound = () => {

    const router = useRouter();

    return (
        <div className={classes.notFound}>
            <h1>Recipe not found</h1>
            <Link href="/"><a>Home</a></Link>
        </div>
    );
};

export default RecipeNotFound;