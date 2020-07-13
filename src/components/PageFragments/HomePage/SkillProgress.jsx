import React from 'react';
import { Row, Col } from 'antd';
import ProgressBar from '../../Progress';

const SkillsProgress = () => (
  <div>
    <h1 className="titleSeparate">My Skills</h1>
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar percent={80} text="Javascript" />
        <ProgressBar percent={95} text="ReactJS" />
        <ProgressBar percent={90} text="NodeJS" />
        <ProgressBar percent={80} text="Docker" />
      </Col>
      <Col xs={24} sm={24} md={12}>
        <ProgressBar percent={40} text="Mysql" />
        <ProgressBar percent={40} text="Redis" />
        <ProgressBar percent={70} text="MongoDB" />
        <ProgressBar percent={60} text="k8s" />
      </Col>
    </Row>
  </div>
);

export default SkillsProgress;
