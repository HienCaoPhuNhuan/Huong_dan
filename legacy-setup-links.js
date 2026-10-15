(() => {
 const moved=new Set(["setup","setup-progress","setup-progress-status","reset-setup-progress","setup-account","setup-repo","private-repo-fix","setup-connect","setup-access","setup-verify","github-check-prompt","github-check-status","readme-handoff","readme-template","readme-template-status","readme-update-prompt","readme-update-status","new-chat-prompt","new-chat-status","security"]);
 const redirect=()=>{let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}if(moved.has(id))location.replace("thiet-lap-github.html"+location.search+location.hash)};
 redirect();window.addEventListener("hashchange",redirect);
})();
