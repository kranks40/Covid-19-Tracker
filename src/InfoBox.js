import React from 'react'
import { Card, CardContent, Typography} from '@material-ui/core'
//import '/InfoBox.css';

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className="infoBox_cases">{cases}</h2>
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
                </Typography>               

            </CardContent>
            
        </Card>
    );
}

export default InfoBox
