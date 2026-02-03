"use client";

import {
  ElementRef,
  RefObject,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Lipsticks } from "@/lib/db";
import BlurFade from "@/components/magic/blur-fade";
import { LipBalm } from "./_components-products-public/lip-balm";
import { LipBalmInJar } from "./_components-products-public/lip-blam-in-jar";
import { LipScrubInJar } from "./_components-products-public/lip-scrub-in-jar";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { FloatArrow } from "./_components-products-public/float-arrow";
import { useParentDataContext } from "@/provider/parent-data-provider";
import {
  ProductCardEnhanced,
  ProductCardSkeleton,
} from "./_components-products-public/product-card-enhanced";
import { motion, AnimatePresence } from "@/lib/motion";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowDownAz,
  ArrowUpAz,
  Percent,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/aceternity-ui/sparkles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export const ProductsPublicClient = () => {
  const homeRef = useRef<ElementRef<"div">>(null);
  const lipBalmRef = useRef<ElementRef<"div">>(null);
  const organicLipstickRef = useRef<ElementRef<"div">>(null);
  const lipstickRef = useRef<ElementRef<"div">>(null);
  const giftSetRef = useRef<ElementRef<"div">>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);

  const productsList = useParentDataContext();

  const productsTransformed = useMemo(() => {
    return productsList?.map((product) => {
      return {
        productId: product.productId,
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        mainImage: product.productImages[0].imageUrl,
        price: product.price,
        discountPrice: product.discountPrice,
        discountPercentage: product.discountPercentage,
        quantity: product.quantity,
      };
    });
  }, [productsList]);

  // Optimize filter and sort logic with useMemo
  const filteredAndSortedProducts = useMemo(() => {
    let result = productsTransformed || [];

    // Filter by search query
    if (searchQuery) {
      result = result.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort result
    if (sortOption) {
      result = [...result].sort((a, b) => {
        const priceA = Number(a.discountPrice || a.price);
        const priceB = Number(b.discountPrice || b.price);

        switch (sortOption) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "name-asc":
            return a.productName.localeCompare(b.productName);
          case "name-desc":
            return b.productName.localeCompare(a.productName);
          case "discount":
            return (
              Number(b.discountPercentage || 0) -
              Number(a.discountPercentage || 0)
            );
          default:
            return 0;
        }
      });
    }

    return result;
  }, [productsTransformed, searchQuery, sortOption]);

  // Optimize scroll performance by removing useWindowScroll which triggers render on every pixel
  const [showFloatArrow, setShowFloatArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isVisible = window.scrollY >= 1452;
      setShowFloatArrow((prev) => {
        if (prev !== isVisible) return isVisible;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onScrollTop = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSortOption(null);
  };

  const hasActiveFilters = searchQuery !== "" || sortOption !== null;

  return (
    <div className="min-h-screen overflow-hidden pt-20 relative" ref={homeRef}>
      <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#47843c"
        />
      </div>
      {/* Animated Background with Gradient Mesh */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/40" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 -left-20 w-96 h-96 bg-gradient-to-br from-moi_moc_green/10 to-emerald-200/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-gradient-to-bl from-green-100/20 to-teal-100/20 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-emerald-100/15 to-green-50/15 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative floating leaves/shapes */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-10 text-9xl">🌿</div>
          <div className="absolute top-40 right-20 text-7xl rotate-45">🍃</div>
          <div className="absolute bottom-40 left-1/4 text-8xl -rotate-12">
            🌱
          </div>
          <div className="absolute top-1/2 right-1/3 text-6xl rotate-90">
            🌿
          </div>
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #87d5a4 1px, transparent 1px),
              linear-gradient(to bottom, #87d5a4 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Radial gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/30" />
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 py-12 text-center relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Sản phẩm tự nhiên
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          100% từ thiên nhiên, an toàn và nuôi dưỡng đôi môi mềm mại
        </p>

        {/* Search Bar & Filter */}
        <div className="max-w-2xl mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg rounded-full border-gray-200 focus:border-moi_moc_green bg-white/50 backdrop-blur-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                variant={hasActiveFilters ? "default" : "outline"}
                className={`rounded-full px-6 transition-all duration-300 ${hasActiveFilters ? "bg-moi_moc_green hover:bg-moi_moc_green/90 text-white border-transparent" : "bg-white/50 backdrop-blur-sm"}`}
              >
                {hasActiveFilters ? (
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="text-sm font-medium hidden sm:inline-block">
                      Đã lọc
                    </span>
                  </div>
                ) : (
                  <SlidersHorizontal className="h-5 w-5" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Sắp xếp theo</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={sortOption === "price-asc"}
                onCheckedChange={() =>
                  setSortOption(sortOption === "price-asc" ? null : "price-asc")
                }
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span>Giá: Thấp đến Cao</span>
                </div>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={sortOption === "price-desc"}
                onCheckedChange={() =>
                  setSortOption(
                    sortOption === "price-desc" ? null : "price-desc",
                  )
                }
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <span>Giá: Cao đến Thấp</span>
                </div>
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={sortOption === "name-asc"}
                onCheckedChange={() =>
                  setSortOption(sortOption === "name-asc" ? null : "name-asc")
                }
              >
                <div className="flex items-center gap-2">
                  <ArrowDownAz className="h-4 w-4 text-gray-500" />
                  <span>Tên: A - Z</span>
                </div>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={sortOption === "name-desc"}
                onCheckedChange={() =>
                  setSortOption(sortOption === "name-desc" ? null : "name-desc")
                }
              >
                <div className="flex items-center gap-2">
                  <ArrowUpAz className="h-4 w-4 text-gray-500" />
                  <span>Tên: Z - A</span>
                </div>
              </DropdownMenuCheckboxItem>

              <DropdownMenuSeparator />

              <DropdownMenuCheckboxItem
                checked={sortOption === "discount"}
                onCheckedChange={() =>
                  setSortOption(sortOption === "discount" ? null : "discount")
                }
              >
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-gray-500" />
                  <span>Khuyến mãi tốt nhất</span>
                </div>
              </DropdownMenuCheckboxItem>

              {hasActiveFilters && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onSelect={clearFilters}
                    className="text-red-500 focus:text-red-500 focus:bg-red-50 justify-center font-medium cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Xóa bộ lọc
                    </div>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? // Loading skeletons
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : // Product cards
                filteredAndSortedProducts?.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCardEnhanced
                      productId={Number(product.id)}
                      productName={product.productName}
                      mainImage={product.mainImage}
                      price={Number(product.price)}
                      discountPrice={
                        product.discountPrice
                          ? Number(product.discountPrice)
                          : undefined
                      }
                      discountPercentage={
                        product.discountPercentage
                          ? Number(product.discountPercentage)
                          : undefined
                      }
                      inStock={Number(product.quantity) > 0}
                      priority={index < 4} // Prioritize first 4 images
                    />
                  </motion.div>
                ))}
          </AnimatePresence>
        </motion.div>

        {filteredAndSortedProducts?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500"
          >
            <Search className="h-16 w-16 mb-4 text-gray-300" />
            <p className="text-xl font-medium">Không tìm thấy sản phẩm nào</p>
            <p className="text-sm mt-2">
              Thử thay đổi từ khóa hoặc bộ lọc của bạn
            </p>
            <Button
              variant="link"
              onClick={clearFilters}
              className="mt-4 text-moi_moc_green"
            >
              Xóa tất cả bộ lọc
            </Button>
          </motion.div>
        )}
      </div>

      {/* Category Sections - Keep existing */}
      <BlurFade inView delay={0.25}>
        <LipBalm ref={lipBalmRef} />
      </BlurFade>
      <BlurFade inView delay={0.25}>
        <LipBalmInJar ref={organicLipstickRef} />
      </BlurFade>
      <BlurFade inView delay={0.25}>
        <LipScrubInJar ref={lipstickRef} />
      </BlurFade>

      <BlurFade inView delay={0.25}>
        <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />
      </BlurFade>
      <BlurFade inView delay={0.25}>
        <Footer />
      </BlurFade>
      <FloatArrow onScrollTop={onScrollTop} visible={showFloatArrow} />
    </div>
  );
};
