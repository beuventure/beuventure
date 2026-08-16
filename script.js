const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('.calc-btn').forEach(btn => btn.addEventListener('click', () => {
  if (btn.dataset.target === 'gradeResult') {
    const value = Number(document.getElementById('gradeInput').value);
    const out = document.getElementById('gradeResult');
    out.textContent = Number.isFinite(value) && value >= 0 && value <= 10 ? `Entered value: ${value.toFixed(2)} / 10` : 'Please enter a valid value between 0 and 10.';
  }
  if (btn.dataset.target === 'percentResult') {
    const marks = Number(document.getElementById('marksInput').value);
    const total = Number(document.getElementById('totalInput').value);
    const out = document.getElementById('percentResult');
    if (Number.isFinite(marks) && Number.isFinite(total) && total > 0 && marks >= 0 && marks <= total) out.textContent = `Percentage: ${(marks / total * 100).toFixed(2)}%`;
    else out.textContent = 'Please enter valid marks and total marks.';
  }
}));

// Academic Hub: official programme lists + semester navigation
const btechBranches = [
  'Civil Engineering','Mechanical Engineering','Electrical Engineering','Electronics & Communication Engineering','Computer Science & Engineering','Information Technology','Chemical Technology (Leather Technology)','Biomedical & Robotic Engineering','Electrical & Electronics Engineering','Civil Engineering with Computer Application','Computer Science & Engineering (AI)','Fire Technology & Safety','Computer Science & Engineering (Cyber Security)','Aeronautical Engineering','Food Processing & Preservation','Computer Science & Engineering (IoT)','Electronics & Communication Engineering (Advance Communication Technology)','Computer Science & Engineering (AI & ML)','Chemical Engineering','Computer Science & Engineering (Data Science)','Electronics Engineering (VLSI Design & Technology)','Mining Engineering','3-D Animation & Graphics','Mechanical & Smart Manufacturing','Mechatronics Engineering','Computer Science & Engineering (Networks)','Computer Science & Engg (IOT & Cyber Security including Block Chain Technology)','Robotics and Automation','Instrumentation Engineering','Agricultural Engineering','Waste Management','Petrochemical Engineering','Chemical Engineering (Plastic & Polymer)','Marine Engineering'
];
const mtechBranches = ['Machine Design','Thermal Engineering','Manufacturing Technology','Energy System and Management','Manufacturing Engineering','Advanced Electronics and Communication Engineering','VLSI Design','Signal Processing and VLSI Technology','Micro Electronics & VLSI Technology','Advance Communication Technology','Electronics and Communication Engineering','Geoinformatics','Geotechnical Engineering','Transportation Engineering','Structural Engineering','Computer Science & Engineering','Cyber Security','Electrical Energy Systems','Power System','Electrical Power System'];
function fillChips(id, arr){const el=document.getElementById(id); if(el) el.innerHTML=arr.map(x=>`<span class="chip">${x}</span>`).join('');}
fillChips('btechBranches',btechBranches); fillChips('mtechBranches',mtechBranches);
const programmeSelect=document.getElementById('programmeSelect'), branchSelect=document.getElementById('branchSelect'), semesterSelect=document.getElementById('semesterSelect'), academicResult=document.getElementById('academicResult');
function updateAcademicHub(){
  const isB=programmeSelect.value==='btech'; const branches=isB?btechBranches:mtechBranches;
  branchSelect.innerHTML=branches.map((x,i)=>`<option value="${i}">${x}</option>`).join('');
  const semCount=isB?8:4; semesterSelect.innerHTML=Array.from({length:semCount},(_,i)=>`<option value="${i+1}">Semester ${i+1}</option>`).join('');
  renderAcademicResult();
}
function renderAcademicResult(){
  const isB=programmeSelect.value==='btech'; const branch= (isB?btechBranches:mtechBranches)[Number(branchSelect.value)||0]; const sem=semesterSelect.value;
  academicResult.innerHTML=`<h3>${isB?'B.Tech':'M.Tech'} • ${branch} • Semester ${sem}</h3><p>This is the BEU Venture academic resource slot for this branch and semester. The current public BEU syllabus page is the authoritative place for syllabus documents; no unofficial PDF is labelled as official.</p><div class="academic-actions"><a class="btn primary" href="https://beu-bih.ac.in/Academics/Syllabus" target="_blank" rel="noopener">Official BEU Syllabus →</a><a class="btn secondary" href="https://beu-bih.ac.in/examination/examination-schedule" target="_blank" rel="noopener">Exam Schedule →</a><a class="btn secondary" href="https://beu-bih.ac.in/result-one" target="_blank" rel="noopener">Results →</a></div>`;
}
if(programmeSelect&&branchSelect&&semesterSelect){programmeSelect.addEventListener('change',updateAcademicHub);branchSelect.addEventListener('change',renderAcademicResult);semesterSelect.addEventListener('change',renderAcademicResult);updateAcademicHub();}
