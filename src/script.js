
    $(function () {
        $("#draggable").draggable();
    });

    let supported_urls = [
        new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/[0-9]+/[^/]+'),
        new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/download/[0-9]+/[^/]+/.+'),
        new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/premium-redirect/[0-9]+'),
        new RegExp('^https?://(linkvertise[.]com|linkvertise[.]net|link-to[.]net|linkvertise[.]download|file-link[.]net|direct-link[.]net|up-to-down[.]net)/[0-9]+/[^/]+/dynamic/?'),
        new RegExp('^https?://(acconpit[.]com|aciterar[.]com|aclabink[.]com|activeation[.]com|activeterium[.]com|adf[.]acb[.]im|adf[.]ly|agileurbia[.]com|android-zone[.]org|anthargo[.]com|aporasal[.]net|aspedrom[.]com|atabencot[.]net|atharori[.]net|atomcurve[.]com|atominik[.]com|ay[.]gy|babblecase[.]com|battleate[.]com|beteshis[.]com|bitigee[.]com|blaleela[.]com|bluenik[.]com|botemoda[.]com|briskrange[.]com|brisktopia[.]com|caneddir[.]com|casualient[.]com|cesinthi[.]com|chinnica[.]net|cigorsica[.]com|clesolea[.]com|coginator[.]com|cogismith[.]com|combostruct[.]com|cowner[.]net|crefranek[.]com|criarysm[.]com|dapalan[.]com|dashsphere[.]com|dataurbia[.]com|deciomm[.]com|detonnot[.]com|dl[.]android-zone[.]org|ducolomal[.]com|ecleneue[.]com|eleburic[.]com|ethobleo[.]com|eunsetee[.]com|evassmat[.]com|evolterr[.]com|extrecey[.]com|fainbory[.]com|fasttory[.]com|fawright[.]com|fiaharam[.]net|flyserve[.]co|fumacrom[.]com|furtelec[.]com|gatustox[.]net|gdanstum[.]net|getrom[.]net|gloyah[.]net|greponozy[.]com|gusimp[.]net|hideadew[.]com|hinafinea[.]com|homoluath[.]com|hopigrarn[.]com|infopade[.]com|infortr[.]co[.]vu|intamema[.]com|ivononic[.]com|j[.]gs|kaitect[.]com|keistaru[.]com|kializer[.]com|kibuilder[.]com|kimechanic[.]com|ksatech[.]info|kudoflow[.]com|larati[.]net|legeerook[.]com|libittarc[.]com|linkjaunt[.]com|locinealy[.]com|lopoteam[.]com|maetrimal[.]com|meriabub[.]net|metastead[.]com|microify[.]com|mmoity[.]com|morebatet[.]com|motriael[.]com|movincle[.]com|neswery[.]com|nimbleinity[.]com|onisedeo[.]com|onizatop[.]net|optitopt[.]com|orablyro[.]com|out[.]unionfansub[.]com|packs[.]redmusic[.]pl|pheecith[.]com|picocurl[.]com|pintient[.]com|pladollmo[.]com|prereheus[.]com|q[.]gs|quainator[.]com|quamiller[.]com|queuecosm[.]bid|raboninco[.]com|rainonit[.]com|rantenah[.]com|rapidteria[.]com|rapidtory[.]com|regecish[.]net|riffhold[.]com|scapognel[.]com|scuseami[.]net|simizer[.]com|skamaker[.]com|skamason[.]com|sluppend[.]com|smeartha[.]com|sprysphere[.]com|stratoplot[.]com|streamvoyage[.]com|st[.]uploadit[.]host|svencrai[.]com|swarife[.]com|swiftation[.]com|swifttopia[.]com|thacorag[.]com|thouth[.]net|tinyical[.]com|tinyium[.]com|tonancos[.]com|toolusts[.]com|triabicia[.]com|turboagram[.]com|twineer[.]com|twiriock[.]com|urstoron[.]com|velocicosm[.]com|velociterium[.]com|viahold[.]com|vismuene[.]com|viwright[.]com|vonasort[.]com|whareotiv[.]com|wirecellar[.]com|www[.]adf[.]ly|www[.]cowner[.]net|xterca[.]net|yabuilder[.]com|yamechanic[.]com|yoalizer[.]com|yobuilder[.]com|yoineer[.]com|yoitect[.]com|zipansion[.]com|zipteria[.]com|zipvale[.]com|zo[.]ee|zoee[.]xyz)/.'),
        new RegExp('^https?://bit[.]ly/.'),
    ];

    let bypass = async function (url) {
        let resp = await fetch("https://bypass.bot.nu/bypass2?url=" + encodeURIComponent(url));
        let j = await resp.json()

        let time_ms = "";
        if (typeof j.time_ms !== "undefined") {
            time_ms = "|" + j.time_ms + "ms";
        }

        console.log(j);

        let li = document.createElement("li");

        if (j.success) {
            li.classList.add("success");
            li.textContent = ">> ";
            let a = document.createElement("a");
            a.textContent = j.destination;
            a.href = j.destination;
            a.rel = "nofollow noreferrer noopener";
            a.target = "_blank";
            li.appendChild(a);
        } else {
            li.classList.add("failure");
            li.textContent = ">> " + url + " - " + j.msg;
        }

        document.querySelector("ul").prepend(li);

        if (j.success && url !== j.destination && supported_urls.some(r => j.destination.match(r))) {
            await bypass(j.destination);
        }
    };

    let submit = async function (e) {
        e.preventDefault();

        let url = document.querySelector("input").value.trim();

        await bypass(url);
    };

    let onload = function () {
        document.querySelector("form").addEventListener("submit", submit)
    };

    window.addEventListener('DOMContentLoaded', onload);
