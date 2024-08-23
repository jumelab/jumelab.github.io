const templateUrl = "";
// const templateUrl = object_name.templateUrl;
// gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
	const menuMain = document.querySelector(".main-menu");
	let open = false;
	checkMenu();
	document.querySelectorAll(".local-nav").forEach((btn, index) => {
		const sto = btn.dataset.sto;

		btn.addEventListener("click", (e) => {
			e.preventDefault();
			gsap.to(window, { duration: 1, scrollTo: { y: sto, offsetY: 50 } });
			checkMenu();
		});
	});

	// tabs
	tabs();

	// Hero swiper
	// new Swiper(".hero-swiper", {
	// 	slidesPerView: 1,
	// 	breakpoints: {
	// 		// when window width is >= 640px
	// 		768: {
	// 			slidesPerView: 2,
	// 		},
	// 	},
	// 	// slidesPerColumnFill: 'row',
	// });

	// Menu btn
	const menuBtn = document.querySelector(".menu-button");
	menuBtn.addEventListener("click", (ev) => {
		ev.preventDefault();
		if (!open) {
			menuMain.style.display = "flex";
			open = true;
		} else {
			menuMain.style.display = "none";
			open = false;
		}
	});

	// Resize
	window.addEventListener("resize", () => {
		checkMenu();
	});

	function checkMenu() {
		if (window.innerWidth < 768) {
			menuMain.style.display = "none";
			open = false;
		} else {
			menuMain.style.display = "flex";
			open = true;
		}
	}
	// Video
	document.getElementById("video-hero").play();
});
// Tabs

function tabs() {
	const tabComp = document.querySelectorAll(".tab-component");
	tabComp.forEach((comp) => {
		// Tabs
		let btnTabs = comp.querySelectorAll(".btns-tab > button");
		let tabs = comp.querySelectorAll(".tabs > .tab");
		btnTabs.forEach((btn, i) => {
			// Active class
			if (i != 0) {
				btn.classList.remove("active");
			} else {
				btn.classList.add("active");
			}
			// Hide
			tabs.forEach((at, i) => {
				if (i != 0) {
					at.style.display = "none";
				}
			});
			// Event
			btn.addEventListener("click", () => {
				hideTabs(tabs);
				showTab(btn);
				removeClass(btnTabs);
				btn.classList.add("active");
			});
		});
		let hideTabs = (_t) => {
			_t.forEach((t, i) => {
				t.style.display = "none";
			});
		};
		let removeClass = (_b) => {
			_b.forEach((b, i) => {
				b.classList.remove("active");
			});
		};
		let showTab = (btn) => {
			const _tab = comp.querySelector("." + btn.dataset.tab);
			_tab.style.display = "flex";
		};
	});
	// Contacto

	document.getElementById("form").addEventListener("submit", function (ev) {
		ev.preventDefault();
		let el = document.querySelector(".form-info");
		el.classList.remove(
			"form-info-success",
			"form-info-alert",
			"form-info-error",
		);
		el.style.display = "none";
		axios
			.post("https://jumelab.com.ar/catalogo/mail/contacto.php", {
				name: document.getElementById("nombre").value,
				email: document.getElementById("email").value,
				message: document.getElementById("mensaje").value,
			})
			.then(function (response) {
				el.style.display = "flex";
				if (response.data == "-1") {
					el.classList.add("form-info-alert");
					el.innerText = "Verifique los datos requeridos";
				}
				if (response.data == "1") {
					el.classList.add("form-info-success");
					el.innerText = "Gracias por escribirnos!";
				}
				document.getElementById("form").reset();
			})
			.catch(function (error) {
				el.classList.add("form-info-error");
				el.innerText = "Ocurrió un error, pruebe más tarde.";
				el.style.display = "flex";
			});
	});
}
