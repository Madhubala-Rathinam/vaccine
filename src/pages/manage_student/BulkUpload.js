import React from "react";
import { Button, Form, Label, Input, Container, FormGroup } from 'reactstrap';

const BulkUpload = () => {

    function onClickListener(event) {
        const input = document.getElementById('formId');
        const data = new FormData(input);
        fetch('http://127.0.0.1:8082/bulkAdd/', {
            method: 'POST',
            body: data,
          })
            .then((resp) => resp.json())
            .then((data) => console.log(data));
    }

    return (<Container style={{ marginTop: 100 }}>
        <Form id="formId">
        <FormGroup >
            <Label for="file">Bulk Upload</Label>
            <Input type="file" id="file" name="file"></Input>
        </FormGroup>
        <Button onClick={onClickListener}>Upload</Button>
    </Form>
    </Container>
    )
};

export default BulkUpload;