const express = require('express');
const router = express.Router();
router.get('/home', (req, res) => {
    res.send('大丈夫生于天地之间，岂能郁郁久居人下');
});
router.get('/te', (req, res) => {
    res.send('大丈夫生于天地之间，岂能郁郁久居人下');
})
module.exports = {
    router
}