**交互式学术主页调研 / 2026-09-06**

结论：可以把主页做成可逛的三维环境，也可以部署到 GitHub Pages。推荐保留快速可读的学术主页，再增加一个独立的 Research World 入口。三维负责探索和个性，HTML 负责论文、链接、搜索收录和无障碍阅读。

1. 类似项目

- [Bruno Simon](https://bruno-simon.com/) / [作者源码](https://github.com/brunosimon/folio-2025)：可驾驶的个人作品世界。值得借鉴的是空间导航和探索反馈，不适合在第一版照搬大场景、物理和重资产系统。
- [Sooah's Room Folio](https://github.com/andrewwoan/sooahs-room-folio) / [在线体验](https://sooahs-room-folio.com/)：可交互的小房间，是本次最接近的空间形式。其实现经验也提醒，命中区域最好独立于装饰动画，避免悬停来回触发。
- [3D Room Portfolio](https://github.com/maxime-mrl/3D-room-portofolio)：Three.js + Blender 房间作品集，可以参考家具物件如何对应个人内容栏目。

本次只参考交互方式，没有复制这些项目的场景、贴图、模型或代码。尤其不能把仓库代码的 MIT 授权误当成所有引用素材都可以随意复用。

2. 技术怎么分工

- Astro：构建静态 HTML、页面结构和真实科研内容。
- Three.js：创建房间、灯光、相机、模型和点击检测。
- WebGL：浏览器执行三维绘制的底层能力，不是另一个需要部署的服务。
- GitHub Pages：托管构建后的 HTML、CSS、JavaScript、字体和模型等静态资源。Astro 官方有[完整部署说明](https://docs.astro.build/en/guides/deploy/github/)。

数据流：现有官网的 profile/news 数据 -> Astro 编译正文 -> Three.js 物件入口打开对应正文。

3. Three.js 和 3DGS 的区别

如果“3GS”指的是 Three.js，本次原型已经按这条路线实现。如果指 **3D Gaussian Splatting**，则是另一种场景表现方式。

- Three.js 几何房间：通过程序或 Blender 制作模型，家具容易绑定交互，体积和性能比较好控制，适合可玩的原创空间。
- 3DGS：通常通过真实房间的照片/视频重建场景，适合写实空间展示。需要先有相应的扫描、重建和压缩资产；高斯点本身不自动带来家具碰撞、语义分区或可操作的对象。
- [Spark](https://sparkjs.dev/docs/) 提供面向 Three.js 的 Gaussian Splatting 渲染能力，[系统设计文档](https://sparkjs.dev/docs/system-design/) 说明了排序和 LOD 等处理。后续可以采用“3DGS 做房间背景 + 简化几何做碰撞 + HTML 热点做内容”的混合方案。

本次没有用户真实房间的扫描资产，因此不伪称已经完成 3DGS 重建。先做轻量几何房间，能更快验证是否喜欢“逛主页”这种体验。

4. 这版的内容映射

- 身份牌 -> 个人介绍、导师、研究方向和合作意向。
- 公告板 -> EMNLP 2026 四篇接收、CVPR 安全挑战赛、ACL 和 CVPR 消息。
- 书架 -> 七篇已选论文，以及单独放在下方的 ExRole / SkillLens 预印本，保留原站链接。
- 电脑 -> OpenPrism、Paper2Any、DataFlow 三个开源项目。
- 橙色座椅 -> 邮件、GitHub、论文索引和合作邀请。

5. 下一轮可以怎么扩展

- 喜欢当前风格：细化原创房间模型、材质、墙上论文封面，并增加房间里的个人物品。
- 想更像游戏：扩成校园或小型研究岛，增加区域切换、路线和更完整的角色动画。科研内容仍要能一键直达。
- 想更写实：准备真实办公室或书房的扫描素材，再评估 Spark / 3DGS 的加载体积和手机表现。
- 不建议为了“像游戏”强迫访客走路找论文、开启声音或等待重资产加载。学术访问者应始终有快速阅读入口。
