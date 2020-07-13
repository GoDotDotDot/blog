import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import GitProject from '../../GitProject';
import { stripTags, domHtml } from '../../../utils/stripTags';
import request from '../../../utils/request';
import SEO from '../../Seo';
import config from '../../../../config';

const pageText = {
  paraOne: `
  哈喽，大家好，我是慕阳（GoDotDotDot），我是一个全栈开发工程师（暂且这么称呼自己吧），我对全栈开发有着无比高的热情。我使用 React.js、Node.js 等有三年多开发经验，也有过 ReactNative、Ionic、H5 等相关的移动端开发经验。`,
  paraTwo: `
  当前我主要工作的技术栈是 React 和 Node.js，我也有以一些运维部署的相关经验，例如 Docker、Kubernetes，Drone 等。现在主要从事研发相关的基础设施相关开发工作，例如搭建研发一站式平台，会涉及到研发流程管控、CI/CD 、研发工具等等，在未来我也希望致力于为研发同事提供更友好的研发环境，为公司为社会创造更多的价值。
  我崇尚大道至简，保持强大的自驱力，这源自我对我的职业的满仓热血。`,
};

const getGitRepos = async name =>
  request(`https://api.github.com/repos/godotdotdot/${name}`);

const AboutMe = () => {
  const [gitList, setGitList] = useState(config.repos);

  useEffect(() => {
    gitList.forEach(async item => {
      const { name } = item;
      const {
        forks,
        stargazers_count,
        description,
        html_url,
      } = await getGitRepos(name);
      const idx = gitList.findIndex(repo => repo.name === name);
      gitList[idx] = {
        name,
        forks,
        stars: stargazers_count,
        intro: description,
        url: html_url,
      };
      setGitList([...gitList]);
    });
  }, []);

  const description = `${pageText.paraOne} ${stripTags(pageText.paraTwo)}`;
  return (
    <>
      <div>
        <SEO
          title="About"
          description={description}
          path=""
          keywords={[
            'GoDotDotDot',
            '慕阳',
            '全栈',
            '前端',
            'FullStack developer',
            'Javascript',
            'ReactJS',
            'NodeJS',
          ]}
        />
        <h1 className="titleSeparate">About Me</h1>
        <p>{pageText.paraOne}</p>
        <p dangerouslySetInnerHTML={domHtml(pageText.paraTwo)} />
      </div>
      <h1 className="titleSeparate">Projects</h1>
      <Row gutter={[20, 20]}>
        {gitList.map(item => {
          const { name, intro, stars, forks, url } = item;
          return (
            <Col xs={24} sm={24} md={12} lg={8}>
              <GitProject
                name={name}
                intro={intro}
                stars={stars}
                forks={forks}
                url={url}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default AboutMe;
