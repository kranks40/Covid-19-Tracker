import React from 'react'
import { Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                {/*Title i.e Caronavirus cases*/}
                <Typography classNamne="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                

                {/*+120k number of cases*/}
                <h2 className="infoBox_cases">{cases}</h2>

                    {/*1.2M Total*/}
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
                </Typography>               

            </CardContent>
            
        </Card>
    )
}

export default InfoBox
