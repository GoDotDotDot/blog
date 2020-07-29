---
title: 转角遇到你-Serverless
path: blog/转角遇到你-Serverless
date: 2019-12-28
cover: ./cover.png
tags: [serverless] 
categories: 2019·Serverless
description: "Serverless 最近几年可谓是一个非常火热的话题，尤其在今年（2019），几乎人人都听过 Serverless。"
excerpt: "Serverless 最近几年可谓是一个非常火热的话题，尤其在今年（2019），几乎人人都听过 Serverless。"
---

Serverless 最近几年可谓是一个非常火热的话题，尤其在今年（2019），几乎人人都听过 Serverless。

> 所有人都在说 Serverless，几乎没人知道怎么落地 Serverless，但是大家都觉得其他人都在做 Serverless，于是大家都在声称自己在做 Serverless。
>
> 这句话还是我当时在蚂蚁的时候听到的，已经忘了是谁说的了，抱歉不能引用作者。

既然这么火，那么什么是 Serverless 呢？为什么要使用 Serverless？我们该如何开始学习它？它是不是下一个技术的风口？这一系列的问题一直在困扰着我，想必大家也曾经想过。于是自己尝试着去研究它，也尝试着去帮助大家解惑。

## 什么是 Serverless

在 web 应用开发早期时代，想要构建 web 应用程序就需要有人去购买服务器硬件，然后在服务器上处理运维部署的事宜，这是一项非常繁琐而昂贵的事情。再后来，云出现了在我们的视野中。可以通过云厂商购买固定的服务器资源，然后利用这些资源完成运维部署工作。但是一般情况下，客户们会为了处理流程或业务高峰问题而超额购买一些服务器资源，虽然现在的云产商提供了自动伸缩能力，但是这些服务器资源的利用率并不高，客户依然在为未使用的资源付费。

无服务器计算（Serverless ）是一种新型的软件架构。它的命名很奇怪，容易让人产生误解。Serverless 并不是没有服务器，只是服务器一般由云服务器提供商来管理，开发人员无需关心。Serverless 能够提供用户编写和部署代码，提供监控、定时、弹性伸缩等服务。Serverless 让开发人员无需关心软件的部署、运维细节以及底层基础架构。开发人员只需专注于业务本身，将精力集中在为用户带来价值的事情上。Serverless 客户真正的按需付费，对于未使用的资源客户不需要付一分钱还能保证服务正常运行。

在提到 Serverless 时，有几点需要我们去了解：

### 微服务（Microservices）

上面也提及到在过去我们的研发模式比较单一，软件架构也比较传统简单。一般一个项目的软件架构由前端、服务端和数据库组成。而随着应用的复杂度上升，过去的应用架构已经开始制约着应用的发展，下图简单的描述了应用架构的演进。

![](./architecture.png)

[微服务](https://en.wikipedia.org/wiki/Microservices)是一种软件设计架构，微服务从设计上来讲倾向于单一职责，往往将一个大型应用按照业务领域、职责划分等拆分成多个子服务。就像积木一样，为了搭建成一个完整的建筑，需要众多的积木来组合成复杂而庞大的建筑。

微服务的优势：

- **弹性：**由于应用程序已分割，因此应用程序的一部分损坏或崩溃并不一定会影响其余的应用程序
- **选择性可伸缩性：**无需扩展整个应用程序，只能扩展获得大量使用的微服务
- **易于添加或更新功能：**可以一次推出或更新一个功能，而不必更新整个应用程序堆栈
- **开发人员的灵活性：**微服务可以用不同的语言编写，并且每种都有自己的库

为什么需要在 Serverless 中提及微服务。虽然微服务有多种部署方式，但是将微服务部署在 Serverless 中才能将优势体现的很明显，微服务仅在应用程序需要它们时才运行，并且天然支持弹性伸缩。我们还可以根据微服务的大小，分解成为更小的函数（FaaS）。

### 函数即服务（FaaS）

在 Serverless 架构里，[FaaS](https://en.wikipedia.org/wiki/Function_as_a_service) 是一项很重要的技术。它改变了传统架构的服务模式，Faas 的粒度变为了函数级别，一个函数即一个服务。但是函数通常是运行在无状态容器中，这意味着无法保持状态，无法在函数中使用之前的执行上下文，而且函数的执行时间是有限制的，像 AWS Lambda 函数可以配置为每次执行最长运行 15 分钟，所以这也是 FaaS 的限制所在，也就意味着不能执行耗时的任务。 Faas 的执行时机是基于事件触发的，至于事件的种类依赖于云厂商，HTTP 触发器是最常见也是使用最多的一种。FaaS 的运行时现在各大云厂商提供的也挺多，例如 Node.js、Python、Go、Java 等等。

例如我们实现一个 helloworld 函数，你只需要在 Serverless 平台中上传这份代码片段，就可以通过触发器来完成执行。执行完毕后直接输出 `hello world!`，真的是太方便了。

```javascript
module.exports = {
  foo: function (event, context) {
    return 'hello world!';
  }
}

```

上述代码可通过该[链接](http://k8s.godotdotdot.com/echo)访问。

### 后端即服务（BaaS）

[BaaS](https://en.wikipedia.org/wiki/Mobile_backend_as_a_service) 作为在 Serverless 架构里另外一项重要的技术，旨在提供业务依赖的服务，例如数据库、消息通知等服务。这些 BaaS 服务一般由云厂商提供，像被谷歌收购的的数据库服务 [FireBase](https://firebase.google.com/) 以及身份验证 [Auth0](https://auth0.com/)。配合 FaaS，可以轻松完成业务开发。BaaS 提供基础服务，FaaS 负责业务逻辑组合，组织 BaaS 基础服务，相互协作，相互配合，真正的让开发人员只关心自己的业务。

例如我们想要实现个文件上传服务，在过去，我们需要建立数据库、配置存储空间、编写服务端代码等等，复杂情况还需要考虑分布式存储、并发等等情况。在 Serverless 中，我们只需要写一个 FaaS 来完成文件上传这个事件，然后文件存储调用 BaaS 对象云存储服务 SDK ，再配合数据库存储 BaaS 服务 SDK，完成这样常见的文件上传服务。结合这个流程来看其实真正我们做的工作就是编写 FaaS，大大减轻了开发的负担，缩短了研发周期。而且还不用考虑存储并发等等问题，因为 Serverless 帮助我们做了这些。

正常情况下 BaaS 提供商能够提供以下功能，例如：

- 数据库管理
- 云存储
- 用户认证
- 推送通知
- 远程更新

### 冷启动（Cold Start）

由于函数是运行在容器中的，因此启动容器需要一定的时间，这也被称为冷启动。一般当你的函数执行完毕，容器一般会保留一段时间（AWS Lambda 为 5 分钟），如果在这段时间内没有新的事件请求过来，这个容器将被销毁掉。

冷启动的持续时间取决于特定云服务商的实现。在 AWS Lambda 上，它的范围从几百毫秒到几秒不等。它可能取决于使用的运行时（或编程语言）、函数（以包的形式）的大小，当然，还取决于所讨论的云服务商。多年以来，随着云服务商在优化时延方面变得越来越出色，冷启动已经大为改善。

### 热启动（Warm Start）

上面提到了冷启动，那么就有对应的热启动，热启动在 Serverless 中指的是函数容器冷启动后在限制的时间内

依然保持启动状态不被销毁，来了新的事件请求后能够立马提供服务。通常我们可以利用一些小技巧，例如通过定时器每隔几分钟来触发一个事件，使得我们对应的函数能够继续被执行，能够保持运行状态。

### API 网关（API Gateway）

[API Gateway](https://www.nginx.com/learn/api-gateway/) 在微服务领域是个必备的技术。它能够处理所有来自客户端的请求，然后根据网关配置，转换和转发请求到合适的微服务。在 Serverless 架构里面，由于都是 FaaS，不能直接对外服务。前面说到 FaaS 是基于事件机制，事件有很多触发器，最常见的就是 HTTP 触发器。那么这么多的 FaaS 服务如果想要以 HTTP 对外服务，那么就需要网关的配合了。就像在微服务领域一样，网关负责将各类 FaaS 服务的触发器捆绑，继而向外暴露安全服务。



## 为什么要用 Serverless

到目前为止，我尝试着解释了下 Serverless 架构的一些知识点。现在，我们将来从 Serverless 的优缺点来一起探讨下我们为什么要用 Serverless。

与传统的基于云或以服务器为中心的基础架构相比，Serverless 具有很多优势。对于开发人员而言，Serverless 提供了更大的灵活性以及更快的发布时间。借助 Serverless，开发人员无需担心购买，供应和管理后端服务器。但是，无服务器计算并不是所有 Web 应用程序开发人员的灵丹妙药。对于企业而言，Serverless 这种按需收费模式将为企业节省很大一笔的资金，尤其对于创业型企业来讲，可以将资金放到最关键的创造用户价值的事情上去。

### 优点

#### 降低运维成本

在当前的开发模式下，运维人员需要处理各种繁琐的事情，例如数据库维护、服务器管理等等。在 Serverless 架构下，虽然程序还是跑在服务器上，但运维人员是无需去管理这些服务的，这些事情将交给云产商管理。这可以减少在运维中的资金投入，从而降低支出，还可以使开发人员腾出时间来创建和扩展其应用程序而不受服务器容量的限制。

使用 Serverless 架构，减小了部署发布的难度、缩短了部署的时间。 运维人员无需发布代码到服务器进行配置即可发布新版本，转而向云产商上传代码片段，这是一种思维上的转变。

#### 降低开发成本

开发系统通常最麻烦的事情是配置开发环境，而在 Serverless 架构中，你只需要一个可以文本编辑器或者只需要一个浏览器。最方便快捷的是使用云厂商提供的云端编辑器，你只需要在编辑器中编写函数即可。编辑完成后一般 Serverless 云厂商提供了部署相关的按钮，点击它即可完成函数的部署。在未来的云端 IDE 编程时代，这也将是一个极大的吸引点。

因为是 FaaS，运行时和开发语言也没什么限制，团队在招人技术栈方面也不需要花费更多的精力，可以直接面向业务，也无需关心复杂的系统架构，这样给与了前端开发人员更多的领域涉及的可能。

在系统的更新迭代上，开发人员可以根据更新的内容选择更新部分函数，更新完成后只需要部署这个更新的函数而不需要重新部署整个系统，不必对整个系统进行更改。

结合 BaaS 服务后，开发一个应用程序将会变得更为简单高效，那些通用的能力交给第三方去管理，缩短的开发时间周期放到更为紧要的事情上去，尤其在创业型互联网企业中来讲，时间就是金钱，更快的上线对他们来讲是至关重要的。

#### 降低拓展成本

Serverless 架构的另一优点就是水平拓展是完全自动的、弹性的并且这种行为是由云厂商提供的。这个特性很直接的好处是我们真的是按需付费。

举个例子，假设我们有一个应用程序每分钟有 1 个请求，如果我们有 10 台机器做为集群，每台机器处理每个请求的平均 CPU 利用率为 1%。那么站在机器利用率的角度来讲，一万个类似的应用程序可以跑在这 10 台机器中，但是现在很明显的是利用率极低。这是一种假想的情形，实际上你可能考虑会下架掉其他机器，以保证经济成本。

但是我们来换一种场景，我们的运营们上线了一个营销活动，这个活动持续的时间是 1 天，带来的结果是现在每分钟有 100 请求，现在的压力是以前的 100 倍。在传统情形中，处于提前应对峰值的考虑，我们需要提前将硬件总数提升到当前的 100 倍，假设为 1000 台，然后就是需要部署下这 1000 台机器做为集群。这其中的工作量以及成本都是非常之大。当活动结束后，这些剩余的计算能力将是一笔巨大的浪费，还需要处理下架的机器。

当然现在的云厂商也提供了自动缩放的能力，但是也有着它的缺陷，就是这些自动缩放的机器可能需要很长的时间来启动和注册，可能会错过高峰时间。

但是在 Serverless 架构中，由于 Serverless 具有天生的水平拓展能力，这将不再是一个问题。从上面的示例来看，很明显有一个特点，就是流量的不稳定，存在流量的波峰和波谷。在波峰时，Serverless FaaS 会自动拓展，帮助应用度过高峰期流量。波谷时，在 FaaS 中我们提到，FaaS 容器会一定时间内如果没有请求过来，将会释放掉该容器，以保证资源不被浪费。基于此，Serverless 可以帮助我们节省一笔资金，还能平稳度过流量高峰。

如果你的应用流量一直很平稳，能够充分利用硬件资源，那可能 Serverless 不是你很好的选择，所以需要你很好的进行评判与计算，选择最适合自己业务的解决方案。

### 缺点

#### 云厂商锁定

在应用初期，你很可能是选择一个特定的云厂商来作为 Serverless 提供商。初期的架构设计都依赖于特定的云厂商，由于各大云厂商的设计方案不一致，如果要更换云厂商，也就意味着需要修改代码以适应云厂商之间的差异。这将又会是一个成本的问题。

即使在软件设计前期考虑了多个云厂商，但是一旦受到某个厂商的变更的影响，还是会存在迁移的成本，如此一来，很大可能就会被云厂商锁死。

在未来，随着 Serverless 的发展，各大云厂商必定会根据规范来让客户可以平滑迁移，达成一致的使用体验。

#### 安全性

在使用 Serverless 也会带来一些安全问题，知道这些潜在的安全问题也会让我们更好的去使用 Serverless 从而可以避开一些风险。

将源码部署到云厂商服务器而不是公司的私有服务器这本身就会有安全隐患，当然这不是 Serverless 独有的问题。所以在云厂商选型时，我们应当选择可靠的云厂商，例如阿里云、亚马逊等等。另外一个问题是云厂商并不会给客户单独分配机器，而是以多租户的模式来运行。多租户模式可能会影响应用的性能，如果云厂商的多租户配置不合理可能会导致客户的数据泄露。

使用 Serverless 将会和传统的应用架构的安全性有所区别，一些安全的访问将直接迁移到云厂商提供的安全平台上，这可能也会造成一些潜在的风险，需要特别注意下。



##  Serverless 的适用场景

在谈论 Serverless 的适用场景之前，我们还是要回顾下 Serverless 的特性。在文章前面部分我们有向大家介绍过 FaaS。前面有介绍到 FaaS 的执行时机是基于事件触发的并且函数的执行时间是有限制的，那么综合考虑这两点，我们可以想象下当今哪些业务场景是此中类型的。

我们很容易就想到 [IoT](https://en.wikipedia.org/wiki/Internet_of_things)、消息通知、定时任务、图像处理等等。很明显针对需要长时间通信的场景 Serverless 并不适用。

前面我们有讲到 HTTP 触发器是 FaaS 事件触发最常见的一种，那么和 HTTP 相关的又符合上面两点的业务那是最合适不过了，例如 RESTful API、SSR 服务和 BFF。

另外最值得一提的一种业务场景就是小程序。虽然叫小程序，但是一个稳定的小程序对于后端的整个架构而言几乎是五脏俱全。自己去搭建这样一套架构不是一件轻松的事情，而 Serverless 就可以帮助我们解决这些棘手的问题，提供 FaaS、云存储等等服务，能够快速帮助小程序上线。而且不担心前期服务器费用，按量付费模式，减轻开发门槛，降低开发成本，就可以更专注于产品打造。我相信有了 Serverless 的辅助，未来会有更多更好用的小程序会上架。其实类似小程序场景都可以借助于 Serverless 快速上线产品、快速变现。在今年，阿里云和腾讯云都相继推出了小程序 Serverless，这也可以看出各厂商对于 Serverless 的重视，其中腾讯云今年还与 [serverless.com](https://serverless.com/) 达成战略合作成为大中华区独家合作伙伴。



## 开源 Serverless 产品

### kubeless

[kubeless](https://github.com/kubeless/kubeless) 是基于 k8s 原生的无服务器框架，可让您部署少量代码而不必担心基础架构的问题。

### fission

[fission](https://github.com/fission/fission) 是基于 k8s 的快速无服务器框架，专注于开发人员的生产力和高性能。

### OpenWhisk

[OpenWhisk](https://github.com/apache/openwhisk) 是一种云优先的基于事件的分布式编程服务。它提供了一种编程模型，可将事件处理程序上传到云服务，并注册处理程序以响应各种事件。



## 案例

https://notes.devops.godotdotdot.com
