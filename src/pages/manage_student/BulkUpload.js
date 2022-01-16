import React from "react";
import { Button, Form, Label, Input, Container, FormGroup } from 'reactstrap';

const BulkUpload = () => {
    return    (  <Container style={{ marginTop: 100 }}><Form>
        <FormGroup>
    <Label for="file">Bulk Upload</Label>
        <Input type="file" id="file" name="file"></Input>
        </FormGroup>
        <Button>Upload</Button>
    </Form>
    </Container> 
    )};

export default BulkUpload;