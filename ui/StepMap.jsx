import { h } from 'preact';
import { useState, useRef } from 'preact/compat';
import FileSaver from 'file-saver';
import { Input, Button, Popover } from 'antd';
import { InfoCircleTwoTone, FileExcelTwoTone, UploadOutlined } from '@ant-design/icons';
import addressImage from './assets/address.png';
import layerImage from './assets/layer.png';
import locationImage from './assets/location.png';

export function StepMap ({onChange, file}) {
    const refInputDataMap = useRef();
    const [mapData, setMapData] = useState({
        address: "",
        layerName: "",
        locationName: "",
        locationDescription: "",
    });

    const canDownload = Object.values(mapData).every(value => value !== "");

    const handleNewInstructions = (event) => {
        setMapData((data) => ({...data, [event.target.name]: event.target.value }))
    };

    const handleDownload = () => {
        const csvData = [
            Object.keys(mapData),
            Object.values(mapData)
        ];

        const csvString = csvData.map(e => e.join(",")).join("\n");

        var blob = new Blob([csvString], {type: "text/csv;charset=utf-8"});
        FileSaver.saveAs(blob, "google_map_instructions.csv");
    }

    return (
        <section class="app__section">
            <h2>How I should place your data on the map?</h2>
            
            <p class="app__instructions">
                Upload existing instructions spreadsheet
            </p>

            <div class="app__file-upload">
                <label onClick={() => refInputDataMap.current.click()}>
                    <input ref={refInputDataMap} type="file" name="data-map-csv" accept=".csv" onChange={onChange}/>
                    
                    <Button size="large" >
                        <UploadOutlined /> Upload Instructions CSV
                    </Button>
                </label>

                {file && (
                    <div class="app__file-preview">
                        <FileExcelTwoTone /> {file}
                    </div>
                )}
                
                <div class="app__step-map-create-layout">
                    <h3>Or create a new one</h3>
                    <p class="app__instructions">Add Column names and text into the input like the following example: <code>{'{'}Column name{'}'} static text</code></p>

                    <div class="app__step-map-inputs">
                        <label>
                            <Input 
                                name="address" 
                                placeholder="address" 
                                size="large"
                                onChange={handleNewInstructions}
                            />

                            <Popover content={<img width="400" height="44" src={addressImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="layerName" 
                                placeholder="layer name" 
                                size="large"
                                onChange={handleNewInstructions}
                            />

                            <Popover content={<img width="441" height="203" src={layerImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="locationName" 
                                placeholder="location name" 
                                size="large"
                                onChange={handleNewInstructions} 
                            />

                            <Popover content={<img width="405" height="193" src={locationImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>

                        <label>
                            <Input 
                                name="locationDescription" 
                                placeholder="location description" 
                                size="large"
                                onChange={handleNewInstructions} 
                            />

                            <Popover content={<img width="405" height="193" src={locationImage} />}>
                                <InfoCircleTwoTone />
                            </Popover>
                        </label>
                    </div>

                    <Button 
                        size="large" 
                        disabled={!canDownload} 
                        onClick={handleDownload}
                    >
                        Download instructions CSV
                    </Button>
                </div>
            </div>
        </section>
    )
}
