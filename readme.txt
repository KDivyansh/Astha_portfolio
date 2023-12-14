#Projects:
To add a project:
1. Add your project name inside <li>"Project Name"</li> under division projects
2. See weather you want to add image on the left side or right side.
3. Accordingly choose the template:

Template for Left Side Image:
<div class="project-item">
    <div class="project-item-image-left">
        <img src="" alt="Project Image">
        <div class="project-item-content">
            <div class="project-title">
                <h2>PROJECT TITLE</h2>
            </div>
            <div class="project-details">
                <p>PROJECT DESCRIPTION GO HERE</p>
                <div class="project-images">
                    <!-- OTHER PHOTOS OF PROJECT-->
	  <img class="expandable" src="" alt="Project 1 Image 1">
                </div>
            </div>
            <button class="read-more-btn" onclick="toggleProjectDetails(this)">Read More</button>
        </div>
    </div>
</div>


Template for Right Side Image
<div class="project-item">
    <div class="project-item-image-right">
        <div class="project-item-content">
            <div class="project-title">
                <h2>PROJECT TITLE</h2>
            </div>
            <div class="project-details">
                <p>PROJECT DESCRIPTION GO HERE</p>
                <div class="project-images">
                    <!-- OTHER PHOTOS OF PROJECT -->
	   <img class="expandable" src="" alt="Project 1 Image 1">
                </div>
            </div>
            <button class="read-more-btn" onclick="toggleProjectDetails(this)">Read More</button>
        </div>
        <img src="" alt="Project Image">
    </div>
</div>

4. Add path to Main Image inside the img src in the top(Left Template) or bottom(Right Template).
5. Add Porject description in the project-details.
6. Add other images with below description.
