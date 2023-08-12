import express from 'express';
import cors from 'cors';
import { allFakers } from "@faker-js/faker";
import {genFailProd} from "./utils/errorUtils.js";
import { genMockData } from './mockGenerator/generator.js'

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3301, () => {
    console.log('Running on port 3301');
});


app.post('/generate', (req, res) => {
    try {

        const STANDART_PAGE = 20
        const CURRENT_PAGE = req.body.page
        const locale = req.body.locale.str
        const faker = allFakers[locale];
        faker.seed(req.body.iseed, CURRENT_PAGE);

        const totalErrors = req.body.failCount;
        const errorRate = 0.5
        const failProducts = genFailProd(
            genMockData(faker, req.body.locale, STANDART_PAGE),
            totalErrors,
            errorRate,
            locale
        );

        res.status(200).json(failProducts);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/getMore', (req, res) => {
    try {
        const ADD_PAGE = 10;
        const seed = req.body.iseed;

        const CURRENT_PAGE = req.body.page;
        const locale = req.body.locale.str
        const faker = allFakers[locale];
        faker.seed(seed);

        const totalErrors = req.body.failCount;
        const errorRate = 0.5
        const failProducts = genFailProd(
            genMockData(faker, req.body.locale, CURRENT_PAGE * ADD_PAGE),
            totalErrors,
            errorRate,
            locale
        );

        const result = failProducts.slice(failProducts.length - ADD_PAGE, failProducts.length);

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
