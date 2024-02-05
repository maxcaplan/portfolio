export default function loadMarkdown(
	file_path_abs: string,
	file_path_rel: string,
): Promise<string> {
	const load_server_side = async (file_path: string): Promise<string> => {
		const fs = await import("fs");
		const path = await import("path");

		return fs.readFileSync(path.resolve(file_path), { encoding: "utf8" });
	};

	const load_client_side = (file_path: string): Promise<string> => {
		return import(file_path + "?raw");
	};

	if (import.meta.env.SSR) {
		return load_server_side(file_path_abs);
	} else {
		return load_client_side(file_path_rel);
	}
}
